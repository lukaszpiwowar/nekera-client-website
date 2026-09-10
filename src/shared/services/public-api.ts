import type {
  ListingFilters,
  PublicAgency,
  PublicListing,
  PublicListingType,
  PublicLocation,
  PublicAgent,
  PagedListings,
} from '../models/public.model';

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
);
const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG ?? '';

function publicBase() {
  if (!TENANT_SLUG) {
    throw new Error('NEXT_PUBLIC_TENANT_SLUG is not set');
  }
  return `${API_URL}/api/public/${TENANT_SLUG}`;
}

async function getJson<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${publicBase()}${path}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`Public API ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getAgency(): Promise<PublicAgency | null> {
  try {
    return await getJson<PublicAgency>('/agency', 60);
  } catch {
    return null;
  }
}

export async function getListings(filters: ListingFilters = {}): Promise<PagedListings> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value != null && value !== '') params.set(key, String(value));
  }
  const qs = params.toString();
  try {
    return await getJson<PagedListings>(`/listings${qs ? `?${qs}` : ''}`, 30);
  } catch {
    return {
      results: [],
      pagination: { page: 1, pageSize: filters.pageSize ?? 12, pageCount: 0, total: 0 },
    };
  }
}

export async function getRecentListings(
  offerType?: 'sale' | 'rent',
  limit = 6,
): Promise<PublicListing[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (offerType) params.set('offerType', offerType);
  try {
    return await getJson<PublicListing[]>(`/listings/recent?${params}`, 60);
  } catch {
    return [];
  }
}

export async function getListing(id: string): Promise<PublicListing | null> {
  try {
    return await getJson<PublicListing>(`/listings/${id}`, 30);
  } catch {
    return null;
  }
}

export async function getSimilarListings(id: string): Promise<PublicListing[]> {
  try {
    return await getJson<PublicListing[]>(`/listings/${id}/similar`, 60);
  } catch {
    return [];
  }
}

export async function getLocations(): Promise<PublicLocation[]> {
  try {
    return await getJson<PublicLocation[]>('/locations', 120);
  } catch {
    return [];
  }
}

export async function getListingTypes(): Promise<PublicListingType[]> {
  try {
    return await getJson<PublicListingType[]>('/listing-types', 120);
  } catch {
    return [];
  }
}

export async function getAgents(): Promise<PublicAgent[]> {
  try {
    return await getJson<PublicAgent[]>('/agents', 120);
  } catch {
    return [];
  }
}

export async function createInquiry(body: {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  listingId?: string;
}): Promise<{ leadId: string; created: boolean }> {
  const res = await fetch(`${publicBase()}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Inquiry failed with ${res.status}`);
  }
  return res.json() as Promise<{ leadId: string; created: boolean }>;
}

export function getTenantSlug() {
  return TENANT_SLUG;
}
