import { getTranslations } from 'next-intl/server';
import { sitesBaseHost } from '@/lib/tenant';

export async function SitesLanding() {
  const t = await getTranslations();
  const host = sitesBaseHost();

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
        Nekera
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold">{t('sites.title')}</h1>
      <p className="mt-4 text-ink-muted">{t('sites.body', { host })}</p>
    </div>
  );
}
