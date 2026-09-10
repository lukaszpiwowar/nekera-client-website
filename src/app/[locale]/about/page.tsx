import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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
  const agency = await getAgency();
  return <AboutView agency={agency} />;
}
