---
title: "How to use multiple accounts in git?"
author: "Ignacio Lopez"
route: "how-to-use-multiple-accounts-in-git"
thumb: "git.jpg"
date: "2023-07-07"
tags:
  - git
---

# How to Use Multiple Git Accounts with SSH Keys

Managing multiple Git accounts on a single machine is a common need for developers who maintain both personal projects and work repositories — often hosted on different platforms (GitHub, GitLab, Bitbucket) or under different organizations. This guide shows you how to configure SSH to automatically use the right key based on the directory you're working in.

---

## Overview

The approach uses two mechanisms:

1. **Per-account SSH key pairs** — each account gets its own private/public key
2. **SSH `config` file** — rules that map directories or hostnames to the right key

No third-party tools required — just SSH and Git.

---

## Step 1: Check Existing SSH Keys

Before generating new keys, check what you already have:

```bash
ls ~/.ssh
```

You'll see files like `id_rsa`, `id_rsa.pub`, or custom-named keys. If no keys exist, generate one:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/personal
```

> 💡 **Use `ed25519` instead of `rsa`** — it's faster, more secure, and generates shorter keys. Use the `-f` flag to specify the file name so keys don't overwrite each other.

Repeat this for each account:

```bash
# Work account 1
ssh-keygen -t ed25519 -C "work@company1.com" -f ~/.ssh/work_1

# Work account 2
ssh-keygen -t ed25519 -C "work@company2.com" -f ~/.ssh/work_2
```

---

## Step 2: Add Public Keys to Each Git Provider

For each key pair, copy the **public key** (`.pub` file) and add it to the respective Git account:

```bash
# Copy to clipboard (macOS)
pbcopy < ~/.ssh/personal.pub

# Linux
xclip -sel clip < ~/.ssh/personal.pub
```

Then go to:
- **GitHub:** Settings → SSH and GPG keys → New SSH key
- **GitLab:** Preferences → SSH Keys → Add key
- **Bitbucket:** Personal Settings → SSH keys → Add key

---

## Step 3: Create the SSH Config File

Open (or create) the SSH config file:

```bash
nano ~/.ssh/config
```

Add configuration rules that map directories to keys using the `Match exec` directive:

```
# Personal account — GitHub
Match host github.com exec "pwd | grep personal"
    IdentityFile ~/.ssh/personal

# Work account 1 — GitHub
Match host github.com exec "pwd | grep work_1"
    IdentityFile ~/.ssh/work_1

# Work account 2 — GitLab
Match host gitlab.com exec "pwd | grep work_2"
    IdentityFile ~/.ssh/work_2
```

**How it works:**

| Directive | Purpose |
|-----------|---------|
| `Match host` | Matches the SSH connection target (e.g., `github.com`) |
| `exec "pwd \| grep work_1"` | Runs a shell command — rule applies only if the command exits with 0 |
| `IdentityFile` | Path to the SSH private key to use when the rule matches |

When you run `git pull` in `~/projects/work_1/my-repo`, the shell command `pwd | grep work_1` succeeds, so SSH uses `~/.ssh/work_1`. In a `~/projects/personal/` directory, it uses `~/.ssh/personal` instead.

---

## Step 4: Save and Apply

Save the file (`Ctrl+X`, then `Y`, then `Enter` in nano).

Add each key to the SSH agent so it's available in your session:

```bash
ssh-add ~/.ssh/personal
ssh-add ~/.ssh/work_1
ssh-add ~/.ssh/work_2
```

To make this persistent across reboots, add the following to `~/.ssh/config`:

```
Host *
    AddKeysToAgent yes
    UseKeychain yes   # macOS only
```

---

## Step 5: Test the Configuration

Verify that each key resolves correctly by testing the SSH connection from the right directory:

```bash
# Test personal account
cd ~/projects/personal-repo
ssh -T git@github.com
# Expected: Hi personal-username! You've successfully authenticated...

# Test work account
cd ~/projects/work_1-repo
ssh -T git@github.com
# Expected: Hi work-username! You've successfully authenticated...
```

Then test a real git operation:

```bash
cd ~/projects/personal/my-project
git pull  # Should use personal SSH key

cd ~/projects/work_1/company-project
git pull  # Should use work_1 SSH key
```

---

## Optional: Per-Repository Git Config

For fine-grained control, you can also set the author identity per repository:

```bash
# Inside a work repository
git config user.name "Work Name"
git config user.email "work@company.com"

# Inside a personal repository
git config user.name "Personal Name"
git config user.email "personal@email.com"
```

Or use `includeIf` in your global `~/.gitconfig` to apply settings directory-wide:

```ini
[includeIf "gitdir:~/projects/work_1/"]
    path = ~/.gitconfig-work1

[includeIf "gitdir:~/projects/personal/"]
    path = ~/.gitconfig-personal
```

---

## Troubleshooting

| Problem | Solution |
|---------|---------|
| `Permission denied (publickey)` | Key not added to agent — run `ssh-add ~/.ssh/your-key` |
| Wrong account authenticates | Check the `pwd` path matches the `grep` pattern in config |
| Key not found | Verify the `IdentityFile` path is correct with `ls ~/.ssh` |
| Multiple keys tried | Run `ssh -vT git@github.com` to see verbose key negotiation |

---

## Conclusion

With this setup, SSH automatically selects the correct key based on your working directory — no manual switching or environment variables needed. Your development workflow remains seamless whether you're contributing to personal open-source projects or pushing to corporate repositories.
