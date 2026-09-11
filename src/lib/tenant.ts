const DEFAULT_PROD_SITES_HOST = 'sites.nekera.app';
const DEFAULT_LOCAL_SITES_HOST = 'sites.localhost';

export function sitesBaseHost(): string {
  if (process.env.NEXT_PUBLIC_SITES_BASE_HOST) {
    return process.env.NEXT_PUBLIC_SITES_BASE_HOST;
  }
  return process.env.NODE_ENV === 'production'
    ? DEFAULT_PROD_SITES_HOST
    : DEFAULT_LOCAL_SITES_HOST;
}

export function resolveTenantSlug(
  hostHeader: string | null | undefined,
  fallbackSlug = process.env.NEXT_PUBLIC_TENANT_SLUG ?? '',
): string | null {
  const host = hostHeader?.split(':')[0]?.toLowerCase().trim();
  if (!host) {
    return emptyToNull(fallbackSlug);
  }

  for (const sitesHost of sitesHosts()) {
    if (host === sitesHost || host === `www.${sitesHost}`) {
      return null;
    }
    const suffix = `.${sitesHost}`;
    if (host.endsWith(suffix)) {
      const slug = host.slice(0, -suffix.length);
      return slug && !slug.includes('.') ? slug : null;
    }
  }

  if (host === 'localhost' || host === '127.0.0.1') {
    return emptyToNull(fallbackSlug);
  }

  return emptyToNull(fallbackSlug);
}

function sitesHosts(): string[] {
  const hosts = new Set<string>([
    DEFAULT_PROD_SITES_HOST,
    DEFAULT_LOCAL_SITES_HOST,
  ]);
  const configured = process.env.NEXT_PUBLIC_SITES_BASE_HOST?.trim();
  if (configured) {
    hosts.add(configured);
  }
  return [...hosts];
}

function emptyToNull(value: string): string | null {
  return value.trim() ? value.trim() : null;
}
