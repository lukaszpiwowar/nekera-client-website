import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAgency } from '@/shared/services/public-api';

export async function Footer() {
  const t = await getTranslations();
  const agency = await getAgency();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <p className="font-display text-xl font-semibold">{agency?.name ?? 'Nekera'}</p>
          <p className="mt-2 max-w-sm text-sm text-white/70">{t('footer.tagline')}</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
          <Link href="/sales">{t('nav.sales')}</Link>
          <Link href="/rent">{t('nav.rent')}</Link>
          <Link href="/about">{t('nav.about')}</Link>
          <Link href="/contact">{t('nav.contact')}</Link>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/50 md:px-6">
          © {year} {agency?.name ?? 'Nekera'}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
