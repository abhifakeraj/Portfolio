import Image from 'next/image';
import { ArrowUpRight, Star, Clock3, CheckCircle2, ClipboardList } from 'lucide-react';
import type { Project } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { TiltCard } from '@/components/ui/tilt-card';

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'Completed':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-1 text-xs font-semibold text-green-500">
          <CheckCircle2 className="h-3 w-3" />
          Completed
        </span>
      );

    case 'In progress':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/15 px-2.5 py-1 text-xs font-semibold text-yellow-500">
          <Clock3 className="h-3 w-3" />
          In Progress
        </span>
      );

    case 'Planned':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/15 px-2.5 py-1 text-xs font-semibold text-sky-500">
          <ClipboardList className="h-3 w-3" />
          Planned
        </span>
      );

    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      );
  }
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={`/projects/${project.slug}`}
      className="group block h-full"
    >
      <TiltCard className="h-full overflow-hidden">

        {/* Thumbnail */}

        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px)100vw,33vw"
          />

          {project.featured && (
            <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          )}
        </div>

        {/* Content */}

        <div className="flex h-[250px] flex-col p-5">

          <div className="mb-3 flex flex-wrap gap-2">

            <Badge variant="accent">
              {project.category}
            </Badge>

            <StatusBadge status={project.status} />

            <Badge variant="outline">
              {project.difficulty}
            </Badge>

          </div>

          <h3 className="flex items-start justify-between gap-2 text-lg font-semibold leading-snug">

            <span>{project.title}</span>

            <ArrowUpRight
              className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />

          </h3>

          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
            {project.summary}
          </p>

          <div className="mt-auto pt-5">

            <div className="flex flex-wrap gap-2">

              {project.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                >
                  {tag}
                </Badge>
              ))}

            </div>

          </div>

        </div>

      </TiltCard>
    </a>
  );
}