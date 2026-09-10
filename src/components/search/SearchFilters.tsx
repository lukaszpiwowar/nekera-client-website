import { getLocale, getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link, getPathname } from '@/i18n/navigation';
import type { OfferType, PublicListingType, PublicLocation } from '@/shared/models/public.model';

type SearchValues = {
  q?: string;
  locationId?: string;
  listingTypeId?: string;
  priceMin?: string;
  priceMax?: string;
  areaMin?: string;
  bedsMin?: string;
  sort?: string;
};

export async function SearchFilters({
  offerType,
  locations,
  types,
  values,
}: {
  offerType: OfferType;
  locations: PublicLocation[];
  types: PublicListingType[];
  values: SearchValues;
}) {
  const t = await getTranslations();
  const locale = await getLocale();
  const action = getPathname({
    locale,
    href: offerType === 'rent' ? '/rent' : '/sales',
  });

  return (
    <form
      method="get"
      action={action}
      className="grid gap-3 rounded-xl border border-line bg-surface p-4 shadow-panel md:grid-cols-2 lg:grid-cols-4"
    >
      <label className="grid gap-1 text-sm">
        <span className="font-medium text-ink-muted">{t('search.query')}</span>
        <input
          name="q"
          defaultValue={values.q}
          placeholder={t('search.queryPlaceholder')}
          className="h-10 rounded-md border border-line bg-white px-3"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium text-ink-muted">{t('search.location')}</span>
        <select
          name="locationId"
          defaultValue={values.locationId ?? ''}
          className="h-10 rounded-md border border-line bg-white px-3"
        >
          <option value="">{t('search.anyLocation')}</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
              {location.listingCount ? ` (${location.listingCount})` : ''}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium text-ink-muted">{t('search.type')}</span>
        <select
          name="listingTypeId"
          defaultValue={values.listingTypeId ?? ''}
          className="h-10 rounded-md border border-line bg-white px-3"
        >
          <option value="">{t('search.anyType')}</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium text-ink-muted">{t('search.sort')}</span>
        <select
          name="sort"
          defaultValue={values.sort ?? 'newest'}
          className="h-10 rounded-md border border-line bg-white px-3"
        >
          <option value="newest">{t('search.sortNewest')}</option>
          <option value="price_asc">{t('search.sortPriceAsc')}</option>
          <option value="price_desc">{t('search.sortPriceDesc')}</option>
          <option value="area_desc">{t('search.sortAreaDesc')}</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium text-ink-muted">{t('search.priceMin')}</span>
        <input
          name="priceMin"
          type="number"
          min={0}
          defaultValue={values.priceMin}
          className="h-10 rounded-md border border-line bg-white px-3"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium text-ink-muted">{t('search.priceMax')}</span>
        <input
          name="priceMax"
          type="number"
          min={0}
          defaultValue={values.priceMax}
          className="h-10 rounded-md border border-line bg-white px-3"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium text-ink-muted">{t('search.areaMin')}</span>
        <input
          name="areaMin"
          type="number"
          min={0}
          defaultValue={values.areaMin}
          className="h-10 rounded-md border border-line bg-white px-3"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium text-ink-muted">{t('search.bedsMin')}</span>
        <input
          name="bedsMin"
          type="number"
          min={0}
          defaultValue={values.bedsMin}
          className="h-10 rounded-md border border-line bg-white px-3"
        />
      </label>
      <div className="flex items-end gap-2 md:col-span-2 lg:col-span-4">
        <Button type="submit">{t('search.apply')}</Button>
        <Button asChild variant="ghost">
          <Link href={offerType === 'rent' ? '/rent' : '/sales'}>{t('search.reset')}</Link>
        </Button>
      </div>
    </form>
  );
}
