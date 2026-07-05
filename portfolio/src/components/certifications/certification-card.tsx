'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Award, Eye } from 'lucide-react';
import type { Certificate } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { formatMonthYear } from '@/lib/utils';

export function CertificationCard({
  certificate,
  onOpen,
}: {
  certificate: Certificate;
  onOpen: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  function handleFlip() {
    setFlipped((prev) => !prev);
  }

  return (
   <div
  className="group h-64 [perspective:1200px]"
  onMouseLeave={() => setFlipped(false)}
>
      <div
        className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
        onClick={handleFlip}
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT */}
        <div className="card-surface absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center [backface-visibility:hidden]">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border bg-surface-muted">
            <Image
             src={certificate.logoUrl}
             alt={certificate.name}
             fill
             className="object-contain p-2"
          />
          </div>

          <h3 className="text-sm font-semibold leading-tight">
            {certificate.name}
          </h3>

          <p className="text-xs text-muted-foreground">
            {certificate.issuer}
          </p>

          <Badge
            variant={
              certificate.status === 'Completed' ? 'success' : 'warning'
            }
          >
            {certificate.status}
          </Badge>

          {/* Hint */}
          <p className="text-xs font-medium text-muted-foreground mt-2 opacity-80 transition-all duration-300 group-hover:text-accent group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_6px_hsl(var(--accent))]">
            Click to view details
          </p>
        </div>

        {/* BACK */}
        <div
          className="card-surface absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <Award className="h-8 w-8 text-accent" />

          <Badge
            variant={
              certificate.status === 'Completed' ? 'success' : 'warning'
            }
          >
            {certificate.status}
          </Badge>

          <Badge variant="accent">{certificate.category}</Badge>

          <p className="text-xs text-muted-foreground">
            Issued {formatMonthYear(certificate.issueDate)}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            <Eye className="h-3.5 w-3.5" /> View Details
          </button>
        </div>
      </div>
    </div>
  );
}