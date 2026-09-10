export type OfferType = 'sale' | 'rent';

export type PublicPhoto = {
  id: string;
  url: string;
  sortOrder: number;
};

export type PublicAgent = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string;
};

export type PublicLocation = {
  id: string;
  name: string;
  alternativeName: string | null;
  level: string;
  parentId: string | null;
  latitude?: number | null;
  longitude?: number | null;
  listingCount?: number;
};

export type PublicListingType = {
  id: string;
  name: string;
  canonicalSlug: string | null;
};

export type PublicListing = {
  id: string;
  title: string;
  description: string | null;
  offerType: OfferType;
  price: number | null;
  currency: string;
  areaM2: number | null;
  bedsCount: number | null;
  floorNumber: number | null;
  totalFloors: number | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  location: PublicLocation | null;
  listingType: PublicListingType | null;
  features: { id: string; name: string }[];
  agent: PublicAgent | null;
  photos: PublicPhoto[];
  coverUrl: string | null;
  photoCount: number;
};

export type PublicAgency = {
  name: string;
  slug: string;
  operations: 'all' | 'sales' | 'rentals';
  currency: string;
  languages: string[];
  listingCounts: { sale: number; rent: number };
};

export type PagedListings = {
  results: PublicListing[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type ListingFilters = {
  offerType?: OfferType;
  page?: number;
  pageSize?: number;
  locationId?: string;
  listingTypeId?: string;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  bedsMin?: number;
  q?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'area_desc';
};
