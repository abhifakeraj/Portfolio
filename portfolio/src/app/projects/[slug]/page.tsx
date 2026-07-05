import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, FileText, Github, Play } from 'lucide-react';
import projectsData from '@/data/projects.json';
import profile from '@/data/profile.json';
import type { Project, ProjectLink } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/reveal';
import { formatDateRange } from '@/lib/utils';

const projects = projectsData as Project[];

/** Pre-render every project slug at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: [project.thumbnail] },
  };
}

const linkIcon: Record<ProjectLink['type'], typeof Github> = {
  github: Github,
  demo: Play,
  file: FileText,
  external: ExternalLink,
};

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="pb-24 pt-28">
      <div className="section-container">
        <Link
          href="/#projects"
          className="focus-ring mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>

        <Reveal>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="accent">{project.category}</Badge>
            <Badge variant="outline">{project.difficulty}</Badge>
            <Badge variant={project.status === 'Completed' ? 'success' : 'warning'}>
              {project.status}
            </Badge>
            <Badge variant="outline">{formatDateRange(project.startDate, project.endDate)}</Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{project.summary}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((link) => {
              const Icon = linkIcon[link.type];
              return (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-border">
          <Image src={project.thumbnail} alt={project.title} fill className="object-cover" priority />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <DetailBlock title="Problem Statement" content={project.problemStatement} />
            <DetailBlock title="Business Impact" content={project.businessImpact} />

            <div>
              <h2 className="mb-3 text-lg font-semibold">Objectives</h2>
              <ul className="space-y-2">
                {project.objectives.map((o) => (
                  <li key={o} className="flex gap-2 text-sm text-foreground/90">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <DetailBlock title="Architecture" content={project.architecture} />

            <div>
              <h2 className="mb-3 text-lg font-semibold">Methodology</h2>
              <ol className="space-y-2">
                {project.methodology.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-foreground/90">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[11px] font-bold text-accent">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <DetailBlock title="Risk Analysis" content={project.riskAnalysis} />
            <DetailBlock title="Lessons Learned" content={project.lessonsLearned} />
            <DetailBlock title="Future Improvements" content={project.futureImprovements} />

            {project.screenshots.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-semibold">Screenshots</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.screenshots.map((src) => (
                    <div key={src} className="relative aspect-video overflow-hidden rounded-xl border border-border">
                      <Image src={src} alt={project.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="card-surface p-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
            <div className="card-surface p-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function DetailBlock({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <p className="text-sm leading-relaxed text-foreground/90">{content}</p>
    </div>
  );
}
