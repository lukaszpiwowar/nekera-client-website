import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getRequestTenantSlug } from '@/lib/tenant.server';
import { ListingDetailView } from '@/views/ListingDetailView';
import { getListing, getSimilarListings } from '@/shared/services/public-api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const slug = await getRequestTenantSlug();
  const listing = slug ? await getListing(slug, id) : null;
  if (!listing) return { title: 'Nekera' };
  return {
    title: listing.title,
    description: listing.description?.slice(0, 160) ?? listing.title,
  };
}

export default async function SalesListingPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const slug = await getRequestTenantSlug();
  if (!slug) notFound();
  const listing = await getListing(slug, id);
  if (!listing || listing.offerType !== 'sale') notFound();
  const similar = await getSimilarListings(slug, id);
  return <ListingDetailView listing={listing} similar={similar} />;
}
