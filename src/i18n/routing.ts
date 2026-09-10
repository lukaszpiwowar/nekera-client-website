import { defineRouting } from 'next-intl/routing';

export const locales = ['pl', 'en', 'sr'] as const;
export type Locale = (typeof locales)[number];

export const pathnames = {
  '/': '/',
  '/sales': {
    pl: '/sprzedaz',
    en: '/sales',
    sr: '/prodaja',
  },
  '/sales/[id]': {
    pl: '/sprzedaz/[id]',
    en: '/sales/[id]',
    sr: '/prodaja/[id]',
  },
  '/rent': {
    pl: '/wynajem',
    en: '/rent',
    sr: '/izdavanje',
  },
  '/rent/[id]': {
    pl: '/wynajem/[id]',
    en: '/rent/[id]',
    sr: '/izdavanje/[id]',
  },
  '/about': {
    pl: '/o-nas',
    en: '/about',
    sr: '/o-nama',
  },
  '/contact': {
    pl: '/kontakt',
    en: '/contact',
    sr: '/kontakt',
  },
} as const;

export const routing = defineRouting({
  locales,
  defaultLocale: 'pl',
  localePrefix: 'always',
  pathnames,
});
