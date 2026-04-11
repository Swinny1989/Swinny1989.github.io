# Katie's K9s – Project Overview

## What this is
A static Next.js website for Katie's K9s, a dog boarding and day care business based in Congleton, Cheshire. Hosted on GitHub Pages at **katiesk9s.co.uk**.

## Tech stack
- **Next.js** (App Router, `output: 'export'` for static generation)
- **Tailwind CSS** for styling
- **TypeScript**
- **Sveltia CMS** for content management (accessible at `/admin`)
- **GitHub Actions** for CI/CD — deploys on push to `master`

## Repository structure
```
.github/workflows/deploy.yml   # GitHub Actions build & deploy
nextjs-site/                   # The Next.js application
  app/                         # App Router pages
  components/                  # Shared components (Nav, Footer)
  content/                     # JSON content files managed by CMS
  public/                      # Static assets (images, favicons, admin CMS)
```

## Deployment
- Default branch is `master` (not `main`)
- GitHub Actions workflow triggers on push to `master`
- Build output goes to `nextjs-site/out/`
- Custom domain: `katiesk9s.co.uk` (CNAME in `nextjs-site/public/`)
- GitHub Pages source must be set to "GitHub Actions" in repo settings

## CMS
- Sveltia CMS at `katiesk9s.co.uk/admin`
- Auth via Cloudflare Worker at `sveltia-cms-auth.tom-ec0.workers.dev`
- Content files managed by CMS:
  - `nextjs-site/content/gallery.json` — gallery images and order
  - `nextjs-site/content/reviews.json` — customer reviews
  - `nextjs-site/content/services.json` — services, pricing, criteria
