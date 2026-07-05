'use client';

import { useMemo, useState } from 'react';
import certificatesData from '@/data/certificates.json';
import type { Certificate } from '@/lib/types';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { CertificationCard } from './certification-card';
import { CertificationModal } from './certification-modal';
import { cn } from '@/lib/utils';

const certificates = certificatesData as Certificate[];

/**
 * CLEANED CATEGORIES (reduced for GRC clarity)
 */
const categories = [
  'All',
  'Governance',
  'Technical',
  'Privacy',
  'Security'
];

const statuses = ['All', 'Completed', 'In Progress'];

export function CertificationsGallery() {
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState<Certificate | null>(null);

  const filtered = useMemo(() => {
    let list = certificates.filter((c) => {
      const matchesCategory = category === 'All' || c.category === category;
      const matchesStatus = status === 'All' || c.status === status;
      return matchesCategory && matchesStatus;
    });

    return list;
  }, [category, status]);

  return (
    <section id="certifications" className="section-container py-24">
      <SectionHeading
        eyebrow="Certifications"
        title="Certification Portfolio"
        description="A structured collection of cybersecurity, GRC, and technical certifications."
      />

      {/* FILTERS ONLY (NO SEARCH, NO SORT) */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              category === cat
                ? 'border-accent bg-accent/15 text-accent'
                : 'border-border text-muted-foreground hover:border-accent/40 hover:text-foreground'
            )}
          >
            {cat}
          </button>
        ))}

        <span className="mx-1 w-px self-stretch bg-border" />

        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              status === s
                ? 'border-accent bg-accent/15 text-accent'
                : 'border-border text-muted-foreground hover:border-accent/40 hover:text-foreground'
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No certifications available for this selection.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cert, i) => (
            <Reveal key={cert.id} delay={Math.min(i * 0.05, 0.3)}>
              <CertificationCard
                certificate={cert}
                onOpen={() => setSelected(cert)}
              />
            </Reveal>
          ))}
        </div>
      )}

      <CertificationModal
        certificate={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}