# GRC & Cybersecurity Portfolio — Phase 1

A premium, fully data-driven cybersecurity / GRC portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

This is **Phase 1** of the full master-prompt build. It ships a complete, production-ready core:

- Hero (animated network background, typing tagline, animated stats)
- About Me (summary, mission, values, strengths, differentiators)
- Skills Dashboard (category filters + click-to-expand skill detail modal)
- Experience (animated vertical timeline)
- Education (timeline with CGPA/coursework)
- Projects Gallery (search, filter by category/status, full project detail pages)
- Certifications Gallery (search, filter, sort, flip cards, detail modal)
- Contact (socials, availability, contact form UI)
- Footer with roadmap / "coming soon" section list
- Full light/dark theme system with persistence
- Responsive, animated, accessible throughout

The architecture is intentionally built so **Phase 2** (GRC Lab, Blog, Interactive Risk Dashboard, Learning Journey, Achievements, Resources, etc.) can be added as new `/src/data/*.json` files + new components + new nav entries, without restructuring anything that already exists.

---

## 1. Folder Structure

```
portfolio/
├── public/
│   ├── images/
│   │   ├── projects/            # project thumbnails & screenshots
│   │   └── certificates/        # certificate badge/preview images
│   ├── certificates/            # certificate PDFs
│   ├── projects/                # project supporting files (sample reports, etc.)
│   ├── resume.pdf               # your resume (replace this file)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx           # root layout: fonts, theme, navbar, footer
│   │   ├── page.tsx             # homepage — composes all sections in order
│   │   ├── not-found.tsx        # custom 404 page
│   │   ├── globals.css          # design tokens (colors), base styles
│   │   └── projects/[slug]/page.tsx   # dynamic project detail page
│   ├── components/
│   │   ├── layout/              # navbar, mobile nav, footer, theme toggle
│   │   ├── sections/            # hero, about, skills, experience, education, contact
│   │   ├── projects/            # gallery, card, filters
│   │   ├── certifications/      # gallery, flip card, modal
│   │   ├── ui/                  # reusable primitives: badge, reveal, section-heading,
│   │   │                          animated-counter, tilt-card
│   │   └── theme-provider.tsx
│   ├── data/                    # ← YOU EDIT THESE FILES TO CHANGE CONTENT
│   │   ├── profile.json
│   │   ├── skills.json
│   │   ├── experience.json
│   │   ├── education.json
│   │   ├── projects.json
│   │   ├── certificates.json
│   │   └── site.json
│   └── lib/
│       ├── types.ts             # TypeScript shape for every data file
│       ├── utils.ts             # cn(), date formatting, search matching
│       └── icon-map.tsx         # maps icon name strings in JSON → lucide icons
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## 2. Installation

Requires **Node.js 18.17+** (Node 20 LTS recommended).

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build for production locally:

```bash
npm run build
npm run start
```

---

## 3. Editing Content — No Component Edits Needed

Everything you listed as "must be editable" lives in `/src/data/*.json`. You never need to touch a `.tsx` file to change content.

| To change...              | Edit this file                  |
|----------------------------|----------------------------------|
| Name, role, bio, stats, socials, resume link | `src/data/profile.json` |
| Skills dashboard entries   | `src/data/skills.json` |
| Internships / training / leadership | `src/data/experience.json` |
| Degrees / coursework       | `src/data/education.json` |
| Projects (add/remove/edit) | `src/data/projects.json` |
| Certifications (add/remove/edit) | `src/data/certificates.json` |
| Nav links, site metadata, roadmap list | `src/data/site.json` |

### Adding a new project
Copy an existing object in `projects.json`, give it a **unique `slug`** (used in the URL `/projects/your-slug`), and fill in the fields. The gallery, filters, search, and the detail page (`/projects/[slug]`) all pick it up automatically — no code changes.

### Adding a new certificate
Copy an existing object in `certificates.json`, give it a unique `id`. It appears in the gallery, is searchable, filterable by category/status, and sortable immediately.

### Adding a new skill
Add an entry to `skills.json` with a `category` from the existing list (or a new one — new categories automatically get their own filter pill). Optionally link it to a project via `relatedProjectSlugs`.

### Images
Drop images into `public/images/projects/` or `public/images/certificates/` and reference them from the JSON as `/images/projects/your-file.png` (leading slash, no `public` in the path). Any image host URL (`https://...`) also works.

### Colors / Theme
All colors are CSS variables defined once in `src/app/globals.css` under `:root` (light theme) and `.dark` (dark theme). Change the HSL values there to re-theme the entire site — no component touches raw color values.

### Resume
Replace `public/resume.pdf` with your actual resume (same filename), or update `resumeUrl` in `profile.json` to point elsewhere.

---

## 4. Deployment (Vercel)

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Next.js** (auto-detected). No special build settings needed.
4. Click **Deploy**.

Every time you edit a JSON file and push to `main`, Vercel redeploys automatically and the site updates.

To use a custom domain, add it under **Project → Settings → Domains** in the Vercel dashboard.

---

## 5. What's in Phase 2 (Planned, Not Yet Built)

The nav (`site.json`) and footer already show these as "Coming Soon" so the architecture doesn't need to change when they're added:

- GRC Lab (Risk Registers, SoA, Policies, Control Matrices, Risk Heatmaps)
- Blog (Markdown-powered articles, search, tags, reading time)
- Interactive Risk & Compliance Dashboard (radar charts, maturity visualization)
- Learning Journey roadmap
- Achievements wall
- Resources library
- CTF Writeups / Case Studies / Testimonials

Each will follow the same pattern: a new `src/data/*.json` (or `/content/*.md` for the blog) + a new section/route component + one new entry in `site.json`'s `nav` array.

---

## 6. Notes on Tech Choices

- **Theme persistence**: uses `next-themes`, which reads/writes `localStorage` and respects `prefers-color-scheme` by default (`defaultTheme="system"`).
- **Animations**: Framer Motion for component-level transitions (scroll reveals, modals, tilt cards); a lightweight Canvas animation for the hero's network background — no heavy WebGL library.
- **Search/filter**: implemented client-side (no backend) since content volume is small; this keeps the architecture simple. If your project count grows very large, consider moving filtering server-side.
- **Images**: uses `next/image` for optimization. If you host images externally, they'll load automatically since `next.config.mjs` allows all remote hosts — you can restrict this to specific domains for tighter security once you know your final image hosts.

---

## 7. Known Placeholders to Replace Before Publishing

- `profile.json`: email, phone, resume/photo URLs, social links
- `experience.json`: the internship entry marked "add real organization"
- `education.json`: CGPA field
- `certificates.json`: credential IDs/URLs and PDF files for in-progress certs
- `public/resume.pdf` and `public/certificates/*.pdf`: currently empty placeholder files
- `public/images/**/*.svg`: currently generated placeholder graphics — swap in real screenshots/photos
