import { Briefcase } from 'lucide-react';
import experienceData from '@/data/experience.json';
import type { ExperienceEntry } from '@/lib/types';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Badge } from '@/components/ui/badge';
import { formatDateRange } from '@/lib/utils';

const experience = experienceData as ExperienceEntry[];

export function Experience() {
  return (
    <section id="experience" className="section-container py-24">
      <SectionHeading
        eyebrow="Experience"
        title="Experience & Professional Journey"
        description="A timeline of leadership and practical experiences that shaped my discipline, responsibility, and teamwork skills. Open to opportunities in IT, cybersecurity, and governance domains."
      />

      <div className="relative border-l border-border pl-8">

        {/* 🟦 LOOKING FOR OPPORTUNITIES BOX (TOP SMALL BLOCK) */}
        <Reveal className="relative mb-6">
          <span className="absolute -left-[calc(2rem+5px)] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface">
            <Briefcase className="h-3 w-3 text-muted-foreground" />
          </span>

          <div className="card-surface p-4 opacity-80 border border-dashed border-border">
            <h3 className="font-semibold text-sm">
              Open to Opportunities
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Actively seeking internships and entry-level roles in cybersecurity, GRC, and IT domains.
            </p>
          </div>
        </Reveal>

        {/* 🟩 EXPERIENCE LIST */}
        {experience.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08} className="relative mb-10 last:mb-0">
            
            <span className="absolute -left-[calc(2rem+5px)] flex h-6 w-6 items-center justify-center rounded-full border border-accent bg-surface">
              <Briefcase className="h-3 w-3 text-accent" />
            </span>

            <div className="card-surface p-6">

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{item.role}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.organization} · {item.location}
                  </p>
                </div>

                <Badge variant="accent">
                  {formatDateRange(item.startDate, item.endDate)}
                </Badge>
              </div>

              <p className="mt-3 text-sm text-foreground/90">
                {item.summary}
              </p>

              {item.responsibilities?.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Responsibilities
                  </h4>

                  <ul className="space-y-1.5 text-sm text-foreground/90">
                    {item.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.achievements?.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Achievements
                  </h4>

                  <ul className="space-y-1.5 text-sm text-foreground/90">
                    {item.achievements.map((a) => (
                      <li key={a} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.tags?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

            </div>
          </Reveal>
        ))}

      </div>
    </section>
  );
}