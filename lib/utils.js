import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with conditional logic
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
