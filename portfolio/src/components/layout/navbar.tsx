'use client';

import { useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Menu, ShieldCheck } from 'lucide-react';
import profile from '@/data/profile.json';
import { ThemeToggle } from './theme-toggle';
import { MobileNav } from './mobile-nav';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // ✅ FINAL FIXED HIERARCHY (YOU CONTROL IT HERE NOW)
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-accent via-sky-400 to-accent"
      />

      <header className="glass fixed top-0 z-50 w-full border-b border-border">
        <div className="section-container flex h-16 items-center justify-between">

          {/* Logo / Name */}
          <a href="#home" className="flex items-center gap-2 font-semibold tracking-tight whitespace-nowrap">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <span className="hidden sm:inline text-base sm:text-lg font-semibold">
             {profile.name}
            </span>
          </a>

          {/* NAV LINKS */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                "focus-ring relative rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href={profile.resumeUrl}
              className="focus-ring hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 sm:inline-flex"
            >
              Resume
            </a>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}