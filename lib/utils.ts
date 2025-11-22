import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (url: string) => {
  // If URL contains "fallback", return no_image.png
  if (url.includes('fallback')) {
    return `${process.env.NEXT_PUBLIC_API_URL}/images/no_image.png`;
  }
  return process.env.NEXT_PUBLIC_API_URL + url;
};
