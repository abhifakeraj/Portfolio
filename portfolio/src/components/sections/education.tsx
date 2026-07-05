import { GraduationCap } from 'lucide-react';
import educationData from '@/data/education.json';
import type { EducationEntry } from '@/lib/types';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Badge } from '@/components/ui/badge';
import { formatDateRange } from '@/lib/utils';

const education = educationData as EducationEntry[];

export function Education() {
  return (
    <section id="education" className="section-container py-24">
      <SectionHeading
        eyebrow="Education"
        title="Academic Foundation"
        description="Formal education and the coursework directly relevant to GRC and cybersecurity."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {education.map((entry, i) => (
          <Reveal key={entry.id} delay={i * 0.1}>
            <div className="card-surface h-full p-6">
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{entry.institution}</h3>
                  <p className="text-sm text-muted-foreground">{entry.degree}</p>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="accent">{formatDateRange(entry.startDate, entry.endDate)}</Badge>
                <Badge variant="outline">{entry.location}</Badge>
                {entry.cgpa && <Badge variant="outline">CGPA: {entry.cgpa}</Badge>}
              </div>

              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Relevant Coursework
              </h4>
              <div className="mb-4 flex flex-wrap gap-2">
                {entry.coursework.map((course) => (
                  <Badge key={course}>{course}</Badge>
                ))}
              </div>

              {entry.achievements.length > 0 && (
                <>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Achievements
                  </h4>
                  <ul className="space-y-1.5 text-sm text-foreground/90">
                    {entry.achievements.map((a) => (
                      <li key={a} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
