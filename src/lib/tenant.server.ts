import { cache } from 'react';
import { headers } from 'next/headers';
import { resolveTenantSlug } from '@/lib/tenant';

export const getRequestTenantSlug = cache(async (): Promise<string | null> => {
  const host = (await headers()).get('host');
  return resolveTenantSlug(host);
});
