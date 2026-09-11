import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getRequestTenantSlug } from '@/lib/tenant.server';
import { SearchView } from '@/views/SearchView';
import {
  getListingTypes,
  getListings,
  getLocations,
} from '@/shared/services/public-api';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: t('meta.rentTitle') };
}

function num(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export default async function RentPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const slug = await getRequestTenantSlug();
  if (!slug) return null;
  const query = await searchParams;
  const values = Object.fromEntries(
    Object.entries(query).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );

  const [listings, locations, types] = await Promise.all([
    getListings(slug, {
      offerType: 'rent',
      q: values.q,
      locationId: values.locationId,
      listingTypeId: values.listingTypeId,
      priceMin: num(values.priceMin),
      priceMax: num(values.priceMax),
      areaMin: num(values.areaMin),
      bedsMin: num(values.bedsMin),
      sort: values.sort as 'newest' | undefined,
      page: num(values.page),
    }),
    getLocations(slug),
    getListingTypes(slug),
  ]);

  return (
    <SearchView
      offerType="rent"
      listings={listings}
      locations={locations}
      types={types}
      searchParams={values}
    />
  );
}
