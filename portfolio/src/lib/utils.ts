import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely, resolving conflicts (last one wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "2024-08" -> "Aug 2024". Leaves "Present" untouched. */
export function formatMonthYear(value: string): string {
  if (value === 'Present') return 'Present';
  const [year, month] = value.split('-').map(Number);
  if (!year || !month) return value;
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/** Builds a "Aug 2024 — Present" style range label. */
export function formatDateRange(start: string, end: string): string {
  return `${formatMonthYear(start)} — ${formatMonthYear(end)}`;
}

/** Basic fuzzy-ish search: matches if every query token appears somewhere in the haystack. */
export function matchesQuery(haystack: string[], query: string): boolean {
  if (!query.trim()) return true;
  const tokens = query.toLowerCase().trim().split(/\s+/);
  const combined = haystack.join(' ').toLowerCase();
  return tokens.every((token) => combined.includes(token));
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
