'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { PublicListing } from '@/shared/models/public.model';

export function ListingGallery({ listing }: { listing: PublicListing }) {
  const t = useTranslations();
  const photos = listing.photos;
  const [active, setActive] = useState(0);
  const current = photos[active];

  if (!current) {
    return (
      <div className="grid aspect-[16/10] place-items-center rounded-xl bg-surface-raised text-ink-muted">
        {t('listing.noPhoto')}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl bg-surface-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.url}
          alt={listing.title}
          className="aspect-[16/10] w-full object-cover"
        />
      </div>
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActive(index)}
              className={`size-16 shrink-0 overflow-hidden rounded-md border ${
                index === active ? 'border-teal' : 'border-line'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
