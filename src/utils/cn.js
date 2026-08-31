import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with clsx conditionals and twMerge deduplication.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
