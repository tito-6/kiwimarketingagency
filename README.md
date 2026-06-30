# Kiwi Marketing Agency

Marketing site for **Kiwi Marketing Agency** — a single codebase covering the
landing page, services, portfolio, blog and contact flows. Built with the
Next.js App Router and a heavy dose of scroll-driven motion.

Live: https://kiwimarketingagency.com

## Tech stack

- **Next.js 16** (App Router, React Server Components)
- **React 19** with the React Compiler enabled
- **Tailwind CSS v4** for styling
- **Framer Motion** for the page transitions and scroll animations
- **Lenis** for smooth scrolling

The brand palette lives in `src/app/globals.css` as CSS variables, so changing
the three tokens there re-skins the whole site:

| Token            | Value     | Usage                    |
| ---------------- | --------- | ------------------------ |
| `--kiwi`         | `#a9cb18` | Primary green (accents)  |
| `--background`   | `#1b1b1b` | Page background (jungle) |
| `--foreground`   | `#cccaca` | Default body text (gray) |

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:3000.

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint     # eslint
```

## Project structure

```
src/
  app/                 # routes (App Router) + global styles, favicon
  components/
    layout/            # Header, Footer, SideNav, PageLayout shell
    sections/          # homepage sections (Hero, About, Services, ...)
    home/ hizmetler/   # page-specific sections, grouped per route
    projeler/ iletisim/ blog/ legal/
    ui/                # reusable building blocks (motion, marquees, cursor...)
    providers/         # SmoothScroll (Lenis) provider
    seo/               # JSON-LD structured data
  data/                # all copy/content lives here (Turkish), no CMS
  lib/                 # small helpers (cn, etc.)
public/images/         # hero, project and service imagery
```

All site copy is centralised in `src/data/*`, so editing text, services,
projects or blog posts never means touching a component. The favicon is the
brand "K" mark in `src/app/icon.svg`, and the full wordmark lives in
`src/components/ui/Logo.tsx`.

## Routes

| Route                  | Page          |
| ---------------------- | ------------- |
| `/`                    | Home          |
| `/hizmetler`           | Services      |
| `/projeler`            | Projects      |
| `/blog`, `/blog/[slug]`| Blog          |
| `/iletisim`            | Contact       |
| `/gizlilik-politikasi` | Privacy policy|
| `/hizmet-sartlari`     | Terms         |

## Configuration

Create a `.env.local` and set the public site URL (used for canonical/OG
metadata):

```
NEXT_PUBLIC_SITE_URL=https://kiwimarketingagency.com
```

### Contact form email (Resend)

The contact form (`/iletisim`) posts to `/api/contact`, which sends the
submission via [Resend](https://resend.com). Set the following env vars
(in `.env.local` for local dev and in your host/Vercel dashboard for prod):

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=info@kiwimarketingagency.com
# Optional — only after verifying your domain in Resend.
# Until then the default onboarding@resend.dev sender is used.
CONTACT_FROM_EMAIL=Kiwi Website <noreply@kiwimarketingagency.com>
```

Without `RESEND_API_KEY`, the form returns a clear error instead of silently
failing, and the submission is logged server-side.

### Social links

Instagram / LinkedIn / Twitter(X) URLs live in `src/data/content.ts` under
`site.social`. Update them there.

## Deployment

The app is a standard Next.js Node server (`npm run build` then `npm start`),
suitable for any Node host (a VPS behind a reverse proxy with TLS, a container,
or a managed platform). Infrastructure details and server configuration are kept
out of this repository.
