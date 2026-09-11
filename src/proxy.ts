import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const tenant = request.nextUrl.searchParams.get('tenant')?.trim().toLowerCase();
  if (tenant && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tenant)) {
    request.headers.set('x-nekera-tenant', tenant);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
