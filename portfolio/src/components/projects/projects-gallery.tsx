'use client';

import { useMemo, useState } from 'react';
import projectsData from '@/data/projects.json';
import type { Project } from '@/lib/types';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { ProjectCard } from './project-card';
import { ProjectFilters } from './project-filters';

const projects = projectsData as Project[];

const statuses = [
  'All',
  'In progress',
  'Planned',
  'Completed',
];

const statusOrder: Record<string, number> = {
  'In progress': 0,
  Planned: 1,
  Completed: 2,
};

export function ProjectsGallery() {
  const [status, setStatus] = useState('All');

  const filtered = useMemo(() => {
    return [...projects]
      .filter((project) => {
        return status === 'All' || project.status === status;
      })
      .sort((a, b) => {
        const orderA = statusOrder[a.status] ?? 999;
        const orderB = statusOrder[b.status] ?? 999;
        return orderA - orderB;
      });
  }, [status]);

  return (
    <section
      id="projects"
      className="section-container py-24"
    >
      <SectionHeading
        eyebrow="Portfolio Projects"
        title="Projects That Reflect My Learning Journey"
        description="A collection of practical GRC, Risk Assessment, Compliance, and Cybersecurity projects built to strengthen real-world understanding. Each project documents the objective, methodology, implementation, and key learnings."
      />

      <ProjectFilters
        statuses={statuses}
        activeStatus={status}
        onStatusChange={setStatus}
      />

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <h3 className="text-lg font-semibold">
            This section is growing
          </h3>

          <p className="mt-2 text-muted-foreground">
            I am actively building new projects and documenting my learning journey. Check back soon for future additions.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={Math.min(index * 0.05, 0.3)}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}