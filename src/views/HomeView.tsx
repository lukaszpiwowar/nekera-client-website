import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { ListingCard } from '@/components/listing/ListingCard';
import type { PublicAgency, PublicAgent, PublicListing } from '@/shared/models/public.model';

export async function HomeView({
  agency,
  sales,
  rentals,
  agents,
}: {
  agency: PublicAgency | null;
  sales: PublicListing[];
  rentals: PublicListing[];
  agents: PublicAgent[];
}) {
  const t = await getTranslations();
  const showSales = agency?.operations !== 'rentals';
  const showRent = agency?.operations !== 'sales';

  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_20%_20%,rgb(20_184_166_/_0.35),transparent_60%)]" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-bright">
            {agency?.name ?? 'Nekera'}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {t('hero.title')}{' '}
            <span className="italic text-teal-bright">{t('hero.titleItalic')}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/75 md:text-lg">
            {t('hero.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {showSales && (
              <Button asChild size="lg">
                <Link href="/sales">{t('hero.searchSales')}</Link>
              </Button>
            )}
            {showRent && (
              <Button asChild size="lg" variant="inverted">
                <Link href="/rent">{t('hero.searchRent')}</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {showSales && sales.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <SectionHeading
            title={t('home.recentSales')}
            href="/sales"
            cta={t('home.viewAll')}
          />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sales.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {showRent && rentals.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <SectionHeading
            title={t('home.recentRent')}
            href="/rent"
            cta={t('home.viewAll')}
          />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rentals.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {agents.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <h2 className="font-display text-2xl font-semibold">{t('home.agents')}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent) => (
              <article
                key={agent.id}
                className="rounded-xl border border-line bg-surface p-4 shadow-panel"
              >
                <div className="grid size-12 place-items-center rounded-full bg-teal-soft font-display text-lg font-semibold text-teal-ink">
                  {agent.firstName[0]}
                  {agent.lastName[0]}
                </div>
                <h3 className="mt-3 font-display font-semibold">
                  {agent.firstName} {agent.lastName}
                </h3>
                {agent.phone && (
                  <p className="mt-1 text-sm text-ink-muted">{agent.phone}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="rounded-2xl bg-ink px-8 py-12 text-white md:px-12">
          <h2 className="font-display text-3xl font-semibold">{t('home.ctaTitle')}</h2>
          <p className="mt-3 max-w-xl text-white/75">{t('home.ctaBody')}</p>
          <div className="mt-6">
            <Button asChild variant="inverted">
              <Link href="/contact">{t('home.ctaButton')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  title,
  href,
  cta,
}: {
  title: string;
  href: '/sales' | '/rent';
  cta: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <Link href={href} className="text-sm font-semibold text-teal hover:text-teal-ink">
        {cta}
      </Link>
    </div>
  );
}
