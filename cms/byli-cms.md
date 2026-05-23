---
title: "Mnemosine Wiki - Deploy your wiki with markdowns without servers !"
author: "Ignacio Lopez"
route: "mnemosine-wiki"
thumb: "caffee.gif"
date: "2024-07-20"
tags:
  - markdown
  - wiki
  - mnemosine
---

## [The Most Powerful JAMstack WIKI — Serverless, API-less, and Built with Angular](https://github.com/bylidev/mnemosine-wiki) 💪

![](./images/caffee.gif)

**Mnemosine Wiki** is an open-source, developer-friendly wiki engine built on the JAMstack philosophy. Write your content in Markdown, deploy to any static host, and get a fully-featured wiki with zero servers and zero APIs required.

---

## 🔥 What is Serverless?

Serverless is a cloud computing model where **you don't manage or provision servers**. Instead of running a persistent backend, functions execute on-demand in response to events — and you pay only for actual execution time.

### Advantages of Serverless

| Advantage | Description |
|---|---|
| **Automatic Scalability** | Functions scale to zero when idle and scale out automatically under load |
| **Cost Efficiency** | Pay only for the compute time your functions actually use |
| **Reduced Maintenance** | No OS patches, no capacity planning, no server provisioning |
| **Faster Deployment** | Deploy a function in seconds, not minutes |

---

## 🌐 What is API-less Architecture?

API-less architecture builds applications that **don't rely on runtime API calls** for every piece of functionality. Instead, data is pre-processed and bundled at build time, eliminating the need for a backend server entirely.

### Benefits of API-less Architecture

| Benefit | Description |
|---|---|
| **Simpler Development** | Fewer moving parts — no backend to build, secure, or maintain |
| **Faster Performance** | No API round-trips means near-instant content loads |
| **Reduced Costs** | No backend infrastructure, no API gateway fees |
| **Better Reliability** | Static files don't have uptime requirements or cold starts |

---

## 🎉 How JAMstack and Serverless Work Together

**JAMstack** (JavaScript, APIs, Markup) defines a modern frontend architecture where:

- **J**avaScript handles dynamic behavior at runtime
- **A**PIs provide backend functionality via HTTPS endpoints
- **M**arkup is pre-built at deploy time

Mnemosine Wiki takes this further with an API-less approach: **all content is compiled from Markdown at build time** — no API calls needed at runtime. The result is a wiki that's fast, cheap to host, and requires no backend whatsoever.

```
Markdown Files → Angular Build → Static HTML/JS/CSS → CDN/Static Host
```

---

## 🛠️ How to Use Mnemosine Wiki

### 1. Clone the Repository

```bash
git clone git@github.com:bylidev/mnemosine-wiki.git
```

### 2. Understand the Project Structure

```
/
├── cms/                   ← Your Markdown content goes here
│   ├── images/            ← Images referenced by your articles
│   └── *.md               ← One Markdown file per article
└── app/                   ← Angular application (don't touch this)
    ├── src/
    ├── package.json
    ├── angular.json
    └── ...
```

> **The `cms/` directory is all you need to manage.** The `app/` directory is the Angular engine — you can always recreate it from the repository.

### 3. Run the Wiki Locally

```bash
cd ./app
npm install
ng serve
```

Navigate to `http://localhost:4200` to see your wiki.

---

## 📝 Markdown Frontmatter

Every Markdown article requires a frontmatter block at the top — a YAML section between `---` delimiters that defines the article's metadata:

```markdown
---
title: "Your Article Title"
author: "Your Name"
route: "url-slug-for-this-article"
thumb: "thumbnail-image.png"
date: "2024-07-20"
tags:
  - tag-one
  - tag-two
---

# Your article content starts here...
```

### Frontmatter Fields Reference

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Article title displayed in the UI and used for SEO |
| `author` | ✅ | Author name displayed on the article page |
| `route` | ✅ | The Angular route for the article (e.g., `/my-article`) |
| `thumb` | ✅ | Thumbnail image filename (must exist in `cms/images/`) |
| `date` | ✅ | Publication date — used for sorting articles chronologically |
| `tags` | ✅ | List of tags for filtering and SEO metadata generation |

---

## 💾 Backups

You only need to **backup the `cms/` directory** — it contains all your content and images. The `app/` directory is your Angular application and can always be recreated from the public repository.

```bash
# Simple backup
tar -czf wiki-backup-$(date +%Y%m%d).tar.gz cms/

# Or push to a private Git repository
git add cms/
git commit -m "backup: wiki content $(date +%Y-%m-%d)"
git push
```

---

## 🚀 Deploying Your Wiki

Mnemosine Wiki deploys to any **static hosting provider**. Build the Angular app and deploy the output:

```bash
cd ./app
npm run build -- --configuration production
```

The built files will be in `app/dist/`. Deploy this directory to:

| Platform | How to Deploy |
|---|---|
| **GitHub Pages** | Use the included GitHub Actions workflow |
| **GitLab Pages** | Push and CI/CD handles the rest |
| **Cloudflare Pages** | Connect your repo — auto-builds on push |
| **Netlify** | Drag and drop the `dist/` folder |
| **Vercel** | Connect repo — zero configuration |

### GitHub Pages (Automatic)

Mnemosine Wiki includes a pre-configured GitHub Actions workflow. Just push to your repository and it deploys automatically.

---

## 🔗 Live Demo

[📖 Visit the Demo at cms.byli.dev](https://cms.byli.dev)

---

## Why Mnemosine Wiki?

| Feature | Traditional Wiki (e.g., Confluence, MediaWiki) | Mnemosine Wiki |
|---|---|---|
| **Infrastructure** | Server + database required | Zero — static files only |
| **Cost** | Monthly server/license fees | Free (hosting) |
| **Content format** | Proprietary markup | Standard Markdown |
| **Version control** | Built-in (often limited) | Full Git history |
| **Performance** | Depends on server | CDN-served, near-instant |
| **Customization** | Limited without plugins | Full Angular control |

Mnemosine Wiki is the ideal solution for teams and individuals who want the simplicity of Markdown, the power of Angular, and the zero-maintenance advantage of static hosting.
