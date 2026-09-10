import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAgency } from '@/shared/services/public-api';
import { LanguageSwitcher } from './LanguageSwitcher';

export async function Header() {
  const t = await getTranslations();
  const agency = await getAgency();

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 md:px-6">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          {agency?.name ?? 'Nekera'}
        </Link>
        <nav className="ml-auto hidden items-center gap-6 text-sm font-medium text-ink-muted md:flex">
          {agency?.operations !== 'rentals' && (
            <Link href="/sales" className="hover:text-ink">
              {t('nav.sales')}
            </Link>
          )}
          {agency?.operations !== 'sales' && (
            <Link href="/rent" className="hover:text-ink">
              {t('nav.rent')}
            </Link>
          )}
          <Link href="/about" className="hover:text-ink">
            {t('nav.about')}
          </Link>
          <Link href="/contact" className="hover:text-ink">
            {t('nav.contact')}
          </Link>
        </nav>
        <div className="ml-auto md:ml-0">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
