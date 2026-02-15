import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateTitle(title: string, maxWords = 5) {
  const words = title.split(" ");
  if (words.length > maxWords) {
    return `${words.slice(0, maxWords).join(" ")} ...`;
  }
  return title;
}
