import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

function apiHostname() {
  try {
    return new URL(apiUrl).hostname;
  } catch {
    return 'localhost';
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: apiHostname(),
      },
      {
        protocol: 'https',
        hostname: 'api.nekera.app',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
