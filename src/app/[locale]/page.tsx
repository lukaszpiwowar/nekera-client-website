import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getRequestTenantSlug } from '@/lib/tenant.server';
import { HomeView } from '@/views/HomeView';
import {
  getAgency,
  getAgents,
  getRecentListings,
} from '@/shared/services/public-api';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t('meta.homeTitle'),
    description: t('meta.homeDescription'),
  };
}

export default async function HomePage() {
  const slug = await getRequestTenantSlug();
  if (!slug) return null;

  const [agency, sales, rentals, agents] = await Promise.all([
    getAgency(slug),
    getRecentListings(slug, 'sale'),
    getRecentListings(slug, 'rent'),
    getAgents(slug),
  ]);

  return (
    <HomeView agency={agency} sales={sales} rentals={rentals} agents={agents} />
  );
}
