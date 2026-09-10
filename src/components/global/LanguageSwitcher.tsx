'use client';

import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const labels: Record<Locale, string> = { pl: 'PL', en: 'EN', sr: 'SR' };

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 rounded-md border border-line bg-white/80 p-0.5 text-xs font-semibold">
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() =>
            router.replace(
              // Dynamic routes like /sales/[id] need params for the typed router.
              { pathname, params } as never,
              { locale: item },
            )
          }
          className={cn(
            'rounded-sm px-2 py-1 transition',
            item === locale ? 'bg-ink text-white' : 'text-ink-muted hover:text-ink',
          )}
        >
          {labels[item]}
        </button>
      ))}
    </div>
  );
}
