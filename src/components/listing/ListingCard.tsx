import { BedDouble, Maximize2 } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { cn, formatNumber, formatPrice } from '@/lib/utils';
import type { PublicListing } from '@/shared/models/public.model';

export async function ListingCard({
  listing,
  className,
}: {
  listing: PublicListing;
  className?: string;
}) {
  const t = await getTranslations();
  const locale = await getLocale();
  const href =
    listing.offerType === 'rent'
      ? ({ pathname: '/rent/[id]', params: { id: listing.id } } as const)
      : ({ pathname: '/sales/[id]', params: { id: listing.id } } as const);
  const price = formatPrice(listing.price, locale, listing.currency);

  return (
    <Link
      href={href}
      className={cn(
        'group overflow-hidden rounded-xl border border-line bg-surface shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-teal/25 hover:shadow-float',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-raised">
        {listing.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={listing.coverUrl}
            alt={listing.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid size-full place-items-center text-sm text-ink-muted">
            {t('listing.noPhoto')}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/10" />
        <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink">
          {listing.offerType === 'rent' ? t('listing.rent') : t('listing.sale')}
        </span>
        {listing.photoCount > 0 && (
          <span className="absolute bottom-3 right-3 rounded-sm bg-ink/70 px-2 py-0.5 text-[11px] font-medium text-white">
            {t('listing.photos', { count: listing.photoCount })}
          </span>
        )}
      </div>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            {listing.listingType?.name ?? listing.location?.name}
          </p>
          <h3 className="mt-1 font-display text-[15px] font-semibold tracking-tight text-ink">
            {listing.title}
          </h3>
          {listing.location && (
            <p className="mt-0.5 text-sm text-ink-muted">{listing.location.name}</p>
          )}
        </div>
        <p className="font-display text-lg font-bold tracking-tight text-ink">
          {price ?? t('listing.priceOnRequest')}
        </p>
        <div className="flex items-center gap-4 border-t border-line pt-3 text-xs font-medium text-ink-muted">
          {listing.bedsCount != null && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="size-3.5" strokeWidth={1.75} />
              {listing.bedsCount}
            </span>
          )}
          {listing.areaM2 != null && (
            <span className="inline-flex items-center gap-1.5">
              <Maximize2 className="size-3.5" strokeWidth={1.75} />
              {t('listing.area', { value: formatNumber(listing.areaM2, locale) })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
