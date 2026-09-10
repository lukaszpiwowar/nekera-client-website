import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactView } from '@/views/ContentViews';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: t('meta.contactTitle') };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactView />;
}
