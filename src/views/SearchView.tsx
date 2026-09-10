import { getTranslations } from 'next-intl/server';
import { ListingCard } from '@/components/listing/ListingCard';
import { SearchFilters } from '@/components/search/SearchFilters';
import { Link } from '@/i18n/navigation';
import type {
  OfferType,
  PagedListings,
  PublicListingType,
  PublicLocation,
} from '@/shared/models/public.model';

export async function SearchView({
  offerType,
  listings,
  locations,
  types,
  searchParams,
}: {
  offerType: OfferType;
  listings: PagedListings;
  locations: PublicLocation[];
  types: PublicListingType[];
  searchParams: Record<string, string | undefined>;
}) {
  const t = await getTranslations();
  const { pagination, results } = listings;
  const basePath = offerType === 'rent' ? '/rent' : '/sales';

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="font-display text-3xl font-semibold">
        {offerType === 'rent' ? t('search.titleRent') : t('search.titleSales')}
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        {t('search.results', { count: pagination.total })}
      </p>
      <div className="mt-6">
        <SearchFilters
          offerType={offerType}
          locations={locations}
          types={types}
          values={searchParams}
        />
      </div>
      {results.length === 0 ? (
        <p className="mt-12 text-ink-muted">{t('search.empty')}</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
      {pagination.pageCount > 1 && (
        <div className="mt-10 flex items-center justify-between text-sm">
          <span className="text-ink-muted">
            {t('search.page', {
              page: pagination.page,
              pageCount: pagination.pageCount,
            })}
          </span>
          <div className="flex gap-2">
            {pagination.page > 1 && (
              <Link
                href={{
                  pathname: basePath,
                  query: { ...searchParams, page: String(pagination.page - 1) },
                }}
                className="rounded-md border border-line px-3 py-1.5"
              >
                ←
              </Link>
            )}
            {pagination.page < pagination.pageCount && (
              <Link
                href={{
                  pathname: basePath,
                  query: { ...searchParams, page: String(pagination.page + 1) },
                }}
                className="rounded-md border border-line px-3 py-1.5"
              >
                →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
