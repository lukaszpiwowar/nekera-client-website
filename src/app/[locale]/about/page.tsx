import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getRequestTenantSlug } from '@/lib/tenant.server';
import { AboutView } from '@/views/ContentViews';
import { getAgency } from '@/shared/services/public-api';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: t('meta.aboutTitle') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const slug = await getRequestTenantSlug();
  if (!slug) return null;
  const agency = await getAgency(slug);
  return <AboutView agency={agency} />;
}
