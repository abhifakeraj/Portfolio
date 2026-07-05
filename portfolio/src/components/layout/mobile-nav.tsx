'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import site from '@/data/site.json';
import profile from '@/data/profile.json';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[80] h-full w-72 border-l border-border bg-surface p-6"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-border"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.comingSoon ? undefined : item.href}
                  onClick={onClose}
                  className={cn(
                    'focus-ring flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-surface-muted hover:text-foreground',
                    item.comingSoon && 'pointer-events-none opacity-50'
                  )}
                >
                  {item.label}
                  {item.comingSoon && (
                    <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                      Soon
                    </span>
                  )}
                </a>
              ))}
            </nav>

            <a
              href={profile.resumeUrl}
              onClick={onClose}
              className="focus-ring mt-8 flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Download Resume
            </a>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
