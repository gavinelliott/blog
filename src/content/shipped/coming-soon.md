---
title: 'BEST AI THINGS'
description: 'A curated AI tool directory built to fix the chaos of discovery.'
date: '2024-12-01'
stack: 'Next.js 14, Sanity, Typesense'
status: 'Live'
github: ''
featured: false
draft: false
heroImage: '/images/bestaithings-banner.jpg'
---

## THE PROBLEM

When I first started getting deeper into AI apps, services and products, I realised I was constantly bookmarking links, saving notes and losing track of what I’d found. There were new tools launching every day and finding the best ones felt like sifting through noise. Twitter threads, product launches, blog posts, it was everywhere but nowhere all at once.

What was missing was a curated space. A place that wasn’t just a list but a proper place for discovery. Something fast, well-organised and useful. A directory that could grow with the speed needed.

## THE APPROACH

I decided to make it my first proper agentic coding project. I wanted to build something real, not just to scratch my own itch but to prove that I could go from zero to shipped with code and tools I was learning to use.

### THE STACK

The site runs on **Next.js 14 with App Router**, using **TypeScript** for safety and **Tailwind CSS** for styling. Animations are powered by **Framer Motion** and forms are handled with **React Hook Form**.

Content is managed through **Sanity CMS**, which gives me a flexible backend with image support, content blocks and category management. I use **Typesense** as the search engine, hooked into the frontend with **typesense-instantsearch-adapter** for real-time search and filtering.

UI-wise, I leaned on **Radix UI** and **Lucide React** for components and icons and design direction from my brain and prompting the agent to do my bidding. Theming is handled by **Next Themes** and there are some fun additions like **React Simple Typewriter** for animated headlines.

Emails are powered by **Resend** and I’ve plugged in **Vercel Analytics** to track usage.

### THE FEATURES

- **AI Tool Directory**: Curated entries with details like category, pricing, links and images
- **Tool Pages**: Each AI tool gets its own page with extended info
- **Advanced Search & Filtering**: Fast, typo-tolerant search with category and type filters
- **Content Management**: Powered by Sanity for easy editing and updates
- **Blog**: AI-related content that adds context and insight
- **Tool Submissions**: Users can suggest new tools via a submission form
- **Responsive Design**: Works well on mobile, tablet and desktop
- **Newsletter & Contact**: Signup forms and a basic contact system using Kit
- **SEO Optimisation**: SSR, metadata, sitemap and performance tuning

## WHAT I LEARNED

Best AI Things was a stretch. Not because it was overly complex but because I needed to figure out everything as I went, it was my first 'real' project. From choosing the right tech to handling form validation and integrating Typesense.

It showed me what I could do with a clear focus and some consistency. And it reminded me that launching is more about momentum than polish.

It now gets a few new submissions a week and I'm looking to try and automate these to a certain extent.
