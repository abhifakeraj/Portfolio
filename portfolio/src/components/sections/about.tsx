import { CheckCircle2, Compass, Sparkles, Target } from 'lucide-react';
import profile from '@/data/profile.json';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';

export function About() {
  return (
    <section id="about" className="section-container py-24">
      <SectionHeading
        eyebrow="About Me"
        title="Structured thinking, applied to security risk"
        description="A quick look at what drives my work in Governance, Risk & Compliance."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="card-surface h-full p-8">
            <p className="text-base leading-relaxed text-foreground/90">{profile.summary}</p>

            <div className="mt-8 flex items-start gap-3 rounded-xl bg-surface-muted p-5">
              <Target className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Mission
                </h3>
                <p className="mt-1 text-sm text-foreground/90">{profile.mission}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <Compass className="h-4 w-4 text-accent" /> Values
                </h3>
                <ul className="space-y-2">
                  {profile.values.map((v) => (
                    <li key={v} className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-accent" /> Strengths
                </h3>
                <ul className="space-y-2">
                  {profile.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card-surface h-full p-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              What Makes Me Different
            </h3>
            <ul className="space-y-4">
              {profile.differentiators.map((item, i) => (
                <li key={item} className="flex gap-3 text-sm text-foreground/90">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
