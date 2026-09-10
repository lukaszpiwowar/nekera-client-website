import { BedDouble, Maximize2 } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { InquiryForm } from '@/components/form/InquiryForm';
import { ListingCard } from '@/components/listing/ListingCard';
import { ListingGallery } from '@/components/listing/ListingGallery';
import { Link } from '@/i18n/navigation';
import { formatNumber, formatPrice } from '@/lib/utils';
import type { PublicListing } from '@/shared/models/public.model';

export async function ListingDetailView({
  listing,
  similar,
}: {
  listing: PublicListing;
  similar: PublicListing[];
}) {
  const t = await getTranslations();
  const locale = await getLocale();
  const price = formatPrice(listing.price, locale, listing.currency);
  const backHref = listing.offerType === 'rent' ? '/rent' : '/sales';

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <Link href={backHref} className="text-sm font-medium text-teal hover:text-teal-ink">
        ← {t('listing.back')}
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <ListingGallery listing={listing} />
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            {listing.offerType === 'rent' ? t('listing.rent') : t('listing.sale')}
            {listing.listingType ? ` · ${listing.listingType.name}` : ''}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
            {listing.title}
          </h1>
          {listing.location && (
            <p className="mt-1 text-ink-muted">{listing.location.name}</p>
          )}
          <p className="mt-4 font-display text-3xl font-bold">
            {price ?? t('listing.priceOnRequest')}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink-muted">
            {listing.bedsCount != null && (
              <span className="inline-flex items-center gap-1.5">
                <BedDouble className="size-4" />
                {t('listing.beds', { count: listing.bedsCount })}
              </span>
            )}
            {listing.areaM2 != null && (
              <span className="inline-flex items-center gap-1.5">
                <Maximize2 className="size-4" />
                {t('listing.area', { value: formatNumber(listing.areaM2, locale) })}
              </span>
            )}
            {listing.floorNumber != null && listing.totalFloors != null && (
              <span>
                {t('listing.floor', {
                  floor: listing.floorNumber,
                  total: listing.totalFloors,
                })}
              </span>
            )}
          </div>
          {listing.description && (
            <p className="mt-8 whitespace-pre-wrap text-[15px] leading-7 text-ink-soft">
              {listing.description}
            </p>
          )}
          {listing.features.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold">
                {t('listing.features')}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {listing.features.map((feature) => (
                  <li
                    key={feature.id}
                    className="rounded-full bg-teal-soft px-3 py-1 text-sm text-teal-ink"
                  >
                    {feature.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <aside className="h-fit space-y-6 rounded-xl border border-line bg-surface p-6 shadow-panel">
          {listing.agent && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {t('listing.agent')}
              </p>
              <p className="mt-2 font-display text-lg font-semibold">
                {listing.agent.firstName} {listing.agent.lastName}
              </p>
              {listing.agent.phone && (
                <a
                  href={`tel:${listing.agent.phone}`}
                  className="mt-1 block text-sm text-teal"
                >
                  {listing.agent.phone}
                </a>
              )}
            </div>
          )}
          <div>
            <h2 className="font-display text-lg font-semibold">{t('listing.inquire')}</h2>
            <div className="mt-3">
              <InquiryForm
                listingId={listing.id}
                defaultMessage={listing.title}
              />
            </div>
          </div>
        </aside>
      </div>
      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">{t('listing.similar')}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
