import { cache } from 'react';
import { headers } from 'next/headers';
import { resolveTenantSlug } from '@/lib/tenant';

export const getRequestTenantSlug = cache(async (): Promise<string | null> => {
  const headerStore = await headers();
  const fromHost = resolveTenantSlug(headerStore.get('host'));
  if (fromHost) {
    return fromHost;
  }
  return emptyToNull(headerStore.get('x-nekera-tenant') ?? '');
});

function emptyToNull(value: string): string | null {
  return value.trim() ? value.trim() : null;
}
