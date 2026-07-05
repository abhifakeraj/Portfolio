'use client';

import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, FileText, X } from 'lucide-react';
import type { Certificate } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { formatMonthYear } from '@/lib/utils';

export function CertificationModal({
  certificate,
  onClose,
}: {
  certificate: Certificate | null;
  onClose: () => void;
}) {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {certificate && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
          />

          {/* CENTER MODAL */}
         <div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            onClick={onClose}>
            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-card-hover">
              {/* IMAGE */}
              <div className="relative aspect-[2/1] w-full">
                <Image
                  src={certificate.imageUrl}
                  alt={certificate.name}
                  fill
                  className="object-cover"
                />

                <button
                  onClick={onClose}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface/90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* CONTENT */}
              <div className="max-h-[60vh] overflow-y-auto p-6">
                <div className="mb-2 flex flex-wrap gap-2">
                  <Badge variant="accent">{certificate.category}</Badge>
                  <Badge variant={certificate.status === 'Completed' ? 'success' : 'warning'}>
                    {certificate.status}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold">{certificate.name}</h3>
                <p className="text-sm text-muted-foreground">{certificate.issuer}</p>

                <p className="mt-4 text-sm text-foreground/90">
                  {certificate.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {certificate.skillsLearned.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>

                <div className="mt-4 text-sm">
                  Issued: {formatMonthYear(certificate.issueDate)}
                </div>

                <div className="mt-5 flex gap-3">
                  {certificate.credentialUrl && (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Verify
                    </a>
                  )}

                  {certificate.pdfUrl && (
                    <a
                      href={certificate.pdfUrl}
                      target="_blank"
                      className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
                    >
                      <FileText className="h-4 w-4" />
                      PDF
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}