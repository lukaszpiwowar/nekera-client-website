import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  value: number | null,
  locale: string,
  currency = 'EUR',
) {
  if (value == null) return null;
  const localeTag =
    locale === 'pl' ? 'pl-PL' : locale === 'sr' ? 'sr-Latn-RS' : 'en-GB';
  return new Intl.NumberFormat(localeTag, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, locale: string) {
  const localeTag =
    locale === 'pl' ? 'pl-PL' : locale === 'sr' ? 'sr-Latn-RS' : 'en-GB';
  return new Intl.NumberFormat(localeTag).format(value);
}
