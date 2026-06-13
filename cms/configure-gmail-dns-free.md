---
title: "Set Up a Custom Domain Email with Gmail for Free"
author: "Ignacio Lopez"
route: "configure-gmail-dns-free"
thumb: "gmail.png"
date: "2026-06-13"
tags:
    - gmail
    - dns
    - email
    - devops
---

# Set Up a Custom Domain Email with Gmail for Free

Using `you@yourdomain.com` instead of `you@gmail.com` looks professional — and you don't need to pay for Google Workspace to get there. With a custom domain, Cloudflare, and Gmail's "Send mail as" feature, you can have it running in under 30 minutes, completely free.

> **What you'll achieve:** receive and send emails from `you@yourdomain.com` directly in your existing Gmail inbox, at no monthly cost.

---

## Prerequisites

- A domain you own (Namecheap, Porkbun, GoDaddy, etc.)
- An existing Gmail account
- Your domain managed through **Cloudflare** (free — you just update your nameservers)

If your domain isn't on Cloudflare yet, add it at [dash.cloudflare.com](https://dash.cloudflare.com) and update the nameservers in your registrar. Propagation can take up to 24 hours.

---

## Step 1: Enable Cloudflare Email Routing

Cloudflare Email Routing forwards emails arriving at your domain to your Gmail — at no cost.

1. In the Cloudflare dashboard, select your domain
2. Go to **Email → Email Routing**
3. Click **Get started**
4. In the **Destination address** field, enter your Gmail address (`you@gmail.com`)
5. Cloudflare will send a verification email — confirm it
6. Under **Routing rules**, create a rule:
   - **Action:** `Send to an email`
   - **Destination:** `you@gmail.com`
   - Use **Catch-all** to receive any variation (`hello@`, `info@`, etc.)

Cloudflare automatically adds the required MX records to your DNS.

---

## Step 2: Verify the MX Records in DNS

Once Email Routing is enabled, Cloudflare will have added records similar to these:

| Type | Name | Content | Priority |
|------|------|---------|----------|
| MX | `@` | `route1.mx.cloudflare.net` | 49 |
| MX | `@` | `route2.mx.cloudflare.net` | 11 |
| MX | `@` | `route3.mx.cloudflare.net` | 18 |
| TXT | `@` | `v=spf1 include:_spf.mx.cloudflare.net ~all` | — |

Confirm they are active under **DNS → Records** for your domain. If any are missing, Email Routing will show a warning banner.

You can verify propagation with:

```bash
dig MX yourdomain.com +short
```

---

## Step 3: Create a Google App Password

Gmail needs an app password (not your regular password) to authenticate via SMTP.

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Make sure **2-Step Verification** is enabled (it's required)
3. Search for **App passwords**
4. Under **Select app**, choose `Mail`
5. Under **Select device**, choose `Other` and type `Gmail SMTP yourdomain`
6. Click **Generate**
7. Copy the 16-character password — you'll need it in the next step (If you have any problems, try without spaces)

---

## Step 4: Configure "Send mail as" in Gmail

This step makes Gmail use your domain as the sender when you compose emails.

1. Open Gmail and go to **Settings → See all settings**
2. Click the **Accounts and Import** tab
3. Under **Send mail as**, click **Add another email address**
4. Fill in:
   - **Name:** your name or brand name
   - **Email address:** `you@yourdomain.com`
   - Uncheck "Treat as an alias" if you want it to appear as a separate account
5. Click **Next Step**
6. Configure the SMTP server:

| Field | Value |
|-------|-------|
| **SMTP Server** | `smtp.gmail.com` |
| **Port** | `587` |
| **Username** | your Gmail address (`you@gmail.com`) |
| **Password** | the app password from Step 3 |
| **Security** | TLS |

7. Click **Add Account**
8. Gmail will send a verification code to `you@yourdomain.com` — since you set up forwarding in Step 1, it will land in your Gmail inbox
9. Enter the code and confirm

---

## Step 5: Add SPF and DKIM Records (Recommended)

These records prevent your emails from ending up in spam.

### SPF

Cloudflare already added a basic SPF record. To allow Gmail to send on behalf of your domain as well, update it to:

```
v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all
```

In Cloudflare DNS, edit the TXT record for `@` with that value.

### DKIM

For this setup, SPF alone is sufficient for most cases. If you want a more robust configuration with custom DKIM signing, consider using **Resend** or **SendGrid** (free tier) as your SMTP relay instead of `smtp.gmail.com`.

---

## Step 6: Set as Default Address (Optional)

If you want all outgoing emails to come from `you@yourdomain.com` by default:

1. Go to **Settings → Accounts and Import → Send mail as**
2. Next to `you@yourdomain.com`, click **make default**

---

## Final Verification

Send a test email from another account to `you@yourdomain.com` — it should arrive in your Gmail inbox.

Then reply to that email and verify the sender shows as `you@yourdomain.com`, not `you@gmail.com`.

You can also inspect the email headers and look for:

```
Received-SPF: pass
```

---

## Cost Breakdown

| Component | Cost |
|-----------|------|
| Cloudflare Email Routing | Free |
| Gmail SMTP | Free |
| Google Workspace | Not needed |
| **Monthly total** | **$0** |

The only cost is the domain itself (~$10–15/year depending on the registrar and TLD).

---

## Conclusion

With Cloudflare Email Routing and Gmail's "Send mail as" feature, you get a fully functional professional email address without a monthly subscription. Setup takes under 30 minutes and is easy to maintain long-term — Cloudflare handles the forwarding infrastructure and Gmail takes care of sending.
