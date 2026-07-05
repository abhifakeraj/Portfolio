import { Reveal } from './reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn('mb-12', align === 'center' && 'text-center', className)}>
      <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p
          className={cn(
            'mt-3 max-w-2xl text-muted-foreground',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
