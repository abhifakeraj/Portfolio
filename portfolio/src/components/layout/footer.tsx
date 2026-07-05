'use client';

import { ArrowUp, ShieldCheck } from 'lucide-react';
import site from '@/data/site.json';
import profile from '@/data/profile.json';
import { getIcon } from '@/lib/icon-map';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="section-container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-5 w-5 text-accent" />
            {profile.name}
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{site.description}</p>
          <div className="mt-5 flex gap-3">
            {profile.socials.map((social) => {
              const Icon = getIcon(social.icon);
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {site.nav
              .filter((item) => !item.comingSoon)
              .map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-muted-foreground hover:text-accent">
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Coming Soon
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {site.futureSections.slice(0, 5).map((section) => (
              <li key={section} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {section}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section-container flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {year} {profile.name}. Built with Next.js, Tailwind & Framer Motion.</span>
          <a
            href="#home"
            className="focus-ring flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 hover:border-accent/50 hover:text-accent"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
