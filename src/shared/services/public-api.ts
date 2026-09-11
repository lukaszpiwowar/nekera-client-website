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

function publicBase(slug: string) {
  if (!slug) {
    throw new Error('Tenant slug is required');
  }
  return `${API_URL}/api/public/${slug}`;
}

async function getJson<T>(slug: string, path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${publicBase(slug)}${path}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`Public API ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getAgency(slug: string): Promise<PublicAgency | null> {
  try {
    return await getJson<PublicAgency>(slug, '/agency', 60);
  } catch {
    return null;
  }
}

export async function getListings(
  slug: string,
  filters: ListingFilters = {},
): Promise<PagedListings> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value != null && value !== '') params.set(key, String(value));
  }
  const qs = params.toString();
  try {
    return await getJson<PagedListings>(
      slug,
      `/listings${qs ? `?${qs}` : ''}`,
      30,
    );
  } catch {
    return {
      results: [],
      pagination: {
        page: 1,
        pageSize: filters.pageSize ?? 12,
        pageCount: 0,
        total: 0,
      },
    };
  }
}

export async function getRecentListings(
  slug: string,
  offerType?: 'sale' | 'rent',
  limit = 6,
): Promise<PublicListing[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (offerType) params.set('offerType', offerType);
  try {
    return await getJson<PublicListing[]>(
      slug,
      `/listings/recent?${params}`,
      60,
    );
  } catch {
    return [];
  }
}

export async function getListing(
  slug: string,
  id: string,
): Promise<PublicListing | null> {
  try {
    return await getJson<PublicListing>(slug, `/listings/${id}`, 30);
  } catch {
    return null;
  }
}

export async function getSimilarListings(
  slug: string,
  id: string,
): Promise<PublicListing[]> {
  try {
    return await getJson<PublicListing[]>(slug, `/listings/${id}/similar`, 60);
  } catch {
    return [];
  }
}

export async function getLocations(slug: string): Promise<PublicLocation[]> {
  try {
    return await getJson<PublicLocation[]>(slug, '/locations', 120);
  } catch {
    return [];
  }
}

export async function getListingTypes(slug: string): Promise<PublicListingType[]> {
  try {
    return await getJson<PublicListingType[]>(slug, '/listing-types', 120);
  } catch {
    return [];
  }
}

export async function getAgents(slug: string): Promise<PublicAgent[]> {
  try {
    return await getJson<PublicAgent[]>(slug, '/agents', 120);
  } catch {
    return [];
  }
}

export async function createInquiry(
  slug: string,
  body: {
    firstName: string;
    lastName?: string;
    email?: string;
    phone?: string;
    message?: string;
    listingId?: string;
  },
): Promise<{ leadId: string; created: boolean }> {
  const res = await fetch(`${publicBase(slug)}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Inquiry failed with ${res.status}`);
  }
  return res.json() as Promise<{ leadId: string; created: boolean }>;
}
