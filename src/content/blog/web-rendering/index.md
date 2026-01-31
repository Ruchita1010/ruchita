---
title: 'Web Rendering'
date: '2026-01-31'
tags: ['rendering', 'ssr', 'ssg', 'isr', 'csr']
slug: 'web-rendering'
---

# Web Rendering
The pendulum swung from server to client and back. Except now we have terms for different approaches and can combine them within a single application.

Each approach has its own use-cases and trade-offs, but all of them revolve around one thing: rendering.

## What is Rendering?
Rendering can mean different things depending on the context. In general, it refers to transforming something from one form into another. For example, the rendering performed by browsers converts HTML, CSS, and JavaScript into pixels on the screen.

In this context, however, rendering means **generating HTML**. It transforms the application state into HTML.

**Where** and **when** this rendering happens determines the approach.

## Server-Side Rendering (SSR)
Rendering happens on the server on each request. 
The browser receives full HTML so you get fast initial content (lower FCP) and better SEO.

Since the server does the templating and data fetching, you avoid additional round trips from the browser. This means less JavaScript to download, parse, and execute. The main thread stays unblocked, leading to faster interactivity (lower TBT, lower TTI). Less JavaScript also leaves more room for unavoidable third-party scripts.

However, generating pages on the server takes time. The user waits longer before seeing the first byte of content (high TTFB). More server resources are consumed, increasing the cost. In traditional SSR, navigation between pages causes a full page reload. Modern frameworks avoid this with hydration and client-side routing, though hydration can negatively impact TTI.

Use SSR when you need fresh, up-to-date content on every request or when SEO is a priority. Common use cases include social media feeds, personalized dashboards, and search results.

## Static Site Generation (SSG)
Rendering happens at build time. Since pages are pre-generated, they are served instantly, resulting in lower TTFB compared to SSR. This also provides fast initial content and interactivity, along with SEO benefits like SSR. Server resource usage is minimal, which reduces cost. The resulting static files can be cached and served directly from a CDN.

The major drawback is that any content update requires rebuilding and redeploying the entire site. Even a typo fix triggers a full rebuild. It's not feasible for sites with a large number of pages.
Build times also increase with the page count.  A site with 10,000 pages takes longer to build than one with 10. Moreover, generating individual HTML files for every possible URL becomes difficult when there are many unique pages and when URLs cannot be fully predicted in advance.

SSG is ideal for content that changes infrequently. Good examples include documentation sites, blogs, portfolios, and marketing pages.

## Incremental Site Regeneration (ISR)
ISR solves the main limitation of SSG by allowing updates to specific pages without a full rebuild. It retains all the benefits of SSG while enabling faster build times and on-demand or time-based revalidation of page data.

ISR has its own tradeoffs. When a page needs regeneration, the rebuild does not happen immediately. Instead, the stale version is served to users while the page is regenerated in the background. The next request for that page then receives the updated version. It also requires careful planning of cache invalidation strategies to ensure users see fresh content.

This approach works well for content that requires frequent updates, such as product pages or news portals.

## Client-Side Rendering (CSR)
Rendering happens on the client using JavaScript. All logic, data fetching, templating, and routing are handled in the browser. The server sends a minimal HTML file that mainly references JavaScript bundle. Once loaded, the browser parses and executes the JavaScript, fetches data from APIs, and renders the UI.

After the initial load, navigation between pages is fast. Only the required data is fetched, and parts of the UI are re-rendered without a full page reload. This enables high interactivity and an app-like user experience. Since most work happens on the client, server load is reduced. The server sends a nearly empty HTML file, so TTFB is usually low.

One downside is the initial page load. All required JavaScript must be downloaded, parsed, and executed before any meaningful content appears on the screen. Users may see a blank or loading state during this time. This also hurts SEO, because search engines must execute JavaScript to see the content, making indexing slower and less reliable.

As the application grows, JavaScript bundles grow as well, increasing download and execution cost. This can negatively impact TBT and INP. Though, techniques like code-splitting and lazy-loading can help improve these metrics.

Any content behind authentication can benefit from CSR since SEO is not relevant in this case. If you need a highly dynamic, interactive, app-like experience and initial load isn't a concern, CSR is a good fit. Common examples include internal tools, dashboards, and chat applications.

This is not an exhaustive list, but these are some of the most popular approaches to rendering on the web.
Pick an approach, or combine multiple approaches, based on the experience you want to create.

Or simply use PHP.

Just kidding. I've never even worked with it, but I found these comments funny.
![Screenshot of two Reddit comments in a thread. The first comment reads: "I swear y’all are about to reinvent php." The reply below says: "Similar to when I read about Server Side Rendering, I was like, "so, you re-invented ASP webforms Ajax!". I know it's not the same, but the similarities are frightening XD.](./imgs/reddit-comments-screenshot.png)

'Til then （￣︶￣）↗