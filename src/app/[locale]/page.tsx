import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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
  const [agency, sales, rentals, agents] = await Promise.all([
    getAgency(),
    getRecentListings('sale'),
    getRecentListings('rent'),
    getAgents(),
  ]);

  return (
    <HomeView agency={agency} sales={sales} rentals={rentals} agents={agents} />
  );
}
