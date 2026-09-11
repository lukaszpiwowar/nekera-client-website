'use client';

import { createContext, useContext, type ReactNode } from 'react';

const TenantSlugContext = createContext<string | null>(null);

export function TenantProvider({
  slug,
  children,
}: {
  slug: string | null;
  children: ReactNode;
}) {
  return (
    <TenantSlugContext.Provider value={slug}>{children}</TenantSlugContext.Provider>
  );
}

export function useTenantSlug(): string {
  const slug = useContext(TenantSlugContext);
  if (!slug) {
    throw new Error('Tenant slug is not available');
  }
  return slug;
}
