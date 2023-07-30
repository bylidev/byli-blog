---
title: " Introducing Byli-CMS - An angular based Lightweight, non-overkill, Open-Source, Serverless Solution"
author: "Ignacio Lopez"
route: "byli-cms"
thumb: "open-source.jpeg"
date: "2023-07-30"
tags:
    - cms
---
# BYLI-CMS

![](./cms/images/open-source.jpeg)

BYLI-CMS is an Angular based cms for lightweight, serverless, scalable, opensource and easily maintainable CMS built for personal blogs. This CMS is designed to be easily deployable on various platforms, including GitLab Pages, GitHub Pages, or Cloudflare Pages. Powered by Angular, it offers high customizability and seamless integration with modern web technologies. Let's dive into its features:

## Features:

### 1. Markdown Support with Metadata:

Write your blog posts using the power of Markdown, and enrich them with metadata such as title, route, and blog images. This allows for easy categorization and enhanced SEO capabilities.

### 2. Serverless Architecture with Intelligent Indexing:

The CMS operates entirely on the client-side, utilizing serverless technologies. The markdown blog posts are intelligently indexed based on specific criteria, eliminating the need for manual pagination. Your readers can easily find and access any blog post without cumbersome pagination.

### 3. SEO-friendly and Indexed with Robot Files:

Each blog post is automatically optimized for search engines, and the CMS generates sitemaps and robot.txt files. The robot.txt file includes all the routes of your blog, ensuring proper indexing and crawling by search engines.

### 4. Image Size Processing:

Upload images directly within the CMS, and it will automatically optimize and resize them to ensure fast loading times and better performance.

### 5. Scalable and Extendable:

Designed to handle a growing blog with ease, the CMS offers a modular structure, allowing you to extend functionality with custom Angular components and modules.

### 6. Route Management:

Easily manage and customize the routes of your blog. The CMS uses Angular's routing capabilities, making it simple to organize content and create custom URL structures.

### 7. Version Control and Deployments:

Since the CMS is built on Angular, you can effortlessly manage your project with version control systems like Git. Deployment to platforms such as GitLab Pages, GitHub Pages, or Cloudflare Pages is straightforward.

### 8. Customizable Themes:

Change the look and feel of your blog by customizing themes. The CMS comes with a set of pre-built themes, and you can create your own easily by modifying CSS.

### 9. User-Friendly Interface:

The intuitive and user-friendly interface makes it easy for authors to write and manage blog posts, even for those without technical knowledge.

### 10. Responsive Design:

Your blog will look great on all devices, thanks to the CMS's responsive design that adapts to various screen sizes.

## Requirements:

-   Node.js and npm for development and build processes.
-   Angular CLI for running the development server and building the project.
-   A static hosting platform such as GitLab Pages, GitHub Pages, or Cloudflare Pages for deployment.

## Getting Started:

1.  Clone the repository from [GitHub](https://github.com/igloar96/byli-cms/releases/tag/1.0.0).
2.  Install Node.js and npm if not already installed.
3.  Install Angular CLI globally using  `npm install -g @angular/cli`.
4.  Run  `npm install`  in the project directory to install dependencies.
5.  Create your blog posts in Markdown format in the  `cms`, `cms/images`  folders.
6. Run `npm run build` 
7.  Run  `ng serve`  for local development and testing.
8.  Deploy the built project on `dist/blog`  to your preferred static hosting platform.


## Live Examples
![](./cms/images/byli.jpg)
- [Byli blog](https://cms.byli.dev)

Now, you have a fully functional Personal Blog CMS running on Angular, ready to share your thoughts with the world!

Please note that this is just a basic overview, and you can extend the CMS with additional features and improvements to suit your specific needs. Happy blogging! 🚀📝

----------

_This project is open-source and licensed under the [MIT License](https://github.com/igloar96/byli-cms/blob/master/LICENSE). Feel free to share and modify this repository, and contributions are always welcome! We value your input and feedback to make Byli-CMS a thriving platform for tech enthusiasts._
](welcome.md)