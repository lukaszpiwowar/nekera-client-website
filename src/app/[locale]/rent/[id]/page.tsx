import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ListingDetailView } from '@/views/ListingDetailView';
import { getListing, getSimilarListings } from '@/shared/services/public-api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) return { title: 'Nekera' };
  return {
    title: listing.title,
    description: listing.description?.slice(0, 160) ?? listing.title,
  };
}

export default async function RentListingPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const listing = await getListing(id);
  if (!listing || listing.offerType !== 'rent') notFound();
  const similar = await getSimilarListings(id);
  return <ListingDetailView listing={listing} similar={similar} />;
}
