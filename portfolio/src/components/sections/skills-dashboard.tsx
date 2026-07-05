'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import skillsData from '@/data/skills.json';
import projectsData from '@/data/projects.json';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Skill = {
  id: string;
  name: string;
  level: number;
  description: string;
  tools?: string[];
  relatedProjectSlugs?: string[];
};

type Tab = {
  name: string;
  skills: Skill[];
};

const tabs: Tab[] = (skillsData as any)?.tabs ?? [];

function LevelRing({ level }: { level: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="shrink-0">
      <circle
        cx="32"
        cy="32"
        r={radius}
        stroke="hsl(var(--border))"
        strokeWidth="5"
        fill="none"
      />
      <motion.circle
        cx="32"
        cy="32"
        r={radius}
        stroke="hsl(var(--accent))"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        transform="rotate(-90 32 32)"
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      <text
        x="32"
        y="32"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fill: "hsl(var(--foreground))",
          fontSize: "13px",
          fontWeight: 600,
        }}
      >
        {level}
      </text>
    </svg>
  );
}

export function SkillsDashboard() {
  const defaultTab = tabs?.[0]?.name ?? 'GRC';

  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // ✅ ALWAYS CALL HOOKS FIRST (no condition before this)

  const activeSkills = useMemo(() => {
    return tabs.find((t) => t.name === activeTab)?.skills ?? [];
  }, [activeTab]);

  const relatedProjects = useMemo(() => {
    if (!selectedSkill?.relatedProjectSlugs) return [];
    return projectsData.filter((p: any) =>
      selectedSkill.relatedProjectSlugs?.includes(p.slug)
    );
  }, [selectedSkill]);

  // ✅ ONLY AFTER ALL HOOKS
  if (!tabs.length) {
    return (
      <section className="section-container py-24">
        <h1 style={{ color: "red", fontSize: "30px" }}>
          SKILLS DASHBOARD LOADED
        </h1>
        <div className="text-red-500">
          Skills data not loaded correctly. Check skills.json structure.
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="section-container py-24">
      <SectionHeading
        eyebrow="Skills Dashboard"
        title="Professional Skills and Competencies"
        description="Explore competencies across GRC, Cybersecurity, Programming, and Professional Skills with related learning outcomes and projects."
      />

      {/* Tabs */}
      <Reveal className="mb-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={cn(
              'focus-ring rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              activeTab === tab.name
                ? 'border-accent bg-accent/15 text-accent'
                : 'border-border text-muted-foreground hover:border-accent/40 hover:text-foreground'
            )}
          >
            {tab.name}
          </button>
        ))}
      </Reveal>

      {/* Skills Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activeSkills.map((skill, i) => (
          <Reveal key={skill.id} delay={Math.min(i * 0.04, 0.3)}>
            <button
              onClick={() => setSelectedSkill(skill)}
              className="focus-ring card-surface flex w-full items-center gap-4 p-5 text-left"
            >
              <LevelRing level={skill.level} />
              <div className="min-w-0">
                <div className="truncate font-semibold">{skill.name}</div>
                <div className="text-xs text-muted-foreground">
                  {activeTab}
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed left-1/2 top-1/2 z-[100] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface p-6 shadow-card-hover"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <LevelRing level={selectedSkill.level} />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {selectedSkill.name}
                    </h3>
                    <Badge variant="accent">{activeTab}</Badge>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSkill(null)}
                  className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-border"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-sm text-foreground/90">
                {selectedSkill.description}
              </p>

              {selectedSkill.tools?.length ? (
                <div className="mt-4">
                  <h4 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                    Tools & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.tools.map((tool) => (
                      <Badge key={tool}>{tool}</Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {relatedProjects.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                    Related Projects
                  </h4>
                  <div className="flex flex-col gap-2">
                    {relatedProjects.map((p: any) => (
                      <a
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        className="focus-ring rounded-lg border border-border px-3 py-2 text-sm hover:border-accent/50 hover:text-accent"
                      >
                        {p.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}