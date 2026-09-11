import { DM_Sans, Sora } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/global/Footer';
import { Header } from '@/components/global/Header';
import { TenantProvider } from '@/components/global/TenantProvider';
import { routing } from '@/i18n/routing';
import { getRequestTenantSlug } from '@/lib/tenant.server';
import { getAgency } from '@/shared/services/public-api';
import { SitesLanding } from '@/views/SitesLanding';
import '../globals.css';

export const dynamic = 'force-dynamic';

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
});

const sora = Sora({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sora',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const slug = await getRequestTenantSlug();

  if (!slug) {
    return (
      <html lang={locale} className={`${dmSans.variable} ${sora.variable}`}>
        <body className="flex min-h-screen flex-col">
          <NextIntlClientProvider messages={messages}>
            <SitesLanding />
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }

  const agency = await getAgency(slug);
  if (!agency) {
    notFound();
  }

  return (
    <html lang={locale} className={`${dmSans.variable} ${sora.variable}`}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider messages={messages}>
          <TenantProvider slug={slug}>
            <Header agency={agency} />
            <main className="flex-1">{children}</main>
            <Footer agency={agency} />
          </TenantProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
