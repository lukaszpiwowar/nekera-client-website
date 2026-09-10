import { getTranslations } from 'next-intl/server';
import { InquiryForm } from '@/components/form/InquiryForm';
import type { PublicAgency } from '@/shared/models/public.model';

export async function AboutView({ agency }: { agency: PublicAgency | null }) {
  const t = await getTranslations();
  const name = agency?.name ?? 'Nekera';

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
        {t('about.eyebrow')}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold">{t('about.title')}</h1>
      <p className="mt-5 text-lg leading-8 text-ink-soft">
        {t('about.body', { name })}
      </p>
      <div className="mt-12 grid gap-6">
        {[1, 2, 3].map((index) => (
          <article key={index} className="rounded-xl border border-line bg-surface p-5 shadow-panel">
            <h2 className="font-display text-lg font-semibold">
              {t(`about.point${index}Title`)}
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              {t(`about.point${index}`)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export async function ContactView() {
  const t = await getTranslations();

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
          {t('contact.eyebrow')}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold">{t('contact.title')}</h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">{t('contact.body')}</p>
      </div>
      <div className="rounded-xl border border-line bg-surface p-6 shadow-panel">
        <InquiryForm />
      </div>
    </div>
  );
}
