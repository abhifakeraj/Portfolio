'use client';

import { cn } from '@/lib/utils';

interface ProjectFiltersProps {
  statuses: string[];
  activeStatus: string;
  onStatusChange: (value: string) => void;
}

export function ProjectFilters({
  statuses,
  activeStatus,
  onStatusChange,
}: ProjectFiltersProps) {
  const getStatusClass = (status: string) => {
    if (activeStatus !== status) {
      return 'border-border text-muted-foreground hover:border-accent/40 hover:text-foreground';
    }

    switch (status) {
      case 'Completed':
        return 'border-green-500 bg-green-500/15 text-green-500';

      case 'In progress':
        return 'border-yellow-500 bg-yellow-500/15 text-yellow-500';

      case 'Planned':
        return 'border-sky-500 bg-sky-500/15 text-sky-500';

      default:
        return 'border-accent bg-accent/15 text-accent';
    }
  };

  return (
    <div className="mb-10 flex flex-wrap justify-center gap-3">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={cn(
            'rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200',
            getStatusClass(status)
          )}
        >
          {status}
        </button>
      ))}
    </div>
  );
}