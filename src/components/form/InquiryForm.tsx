'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTenantSlug } from '@/components/global/TenantProvider';
import { Button } from '@/components/ui/button';
import { createInquiry } from '@/shared/services/public-api';

export function InquiryForm({
  listingId,
  defaultMessage,
}: {
  listingId?: string;
  defaultMessage?: string;
}) {
  const t = useTranslations();
  const slug = useTenantSlug();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  );

  async function onSubmit(formData: FormData) {
    setStatus('sending');
    try {
      const firstName = String(formData.get('firstName') ?? '').trim();
      const lastName = String(formData.get('lastName') ?? '').trim();
      const email = String(formData.get('email') ?? '').trim();
      const phone = String(formData.get('phone') ?? '').trim();
      const message = String(formData.get('message') ?? '').trim();
      await createInquiry(slug, {
        firstName,
        lastName: lastName || undefined,
        email: email || undefined,
        phone: phone || undefined,
        message: message || undefined,
        listingId,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className="rounded-lg border border-teal-soft bg-teal-soft/50 px-4 py-3 text-sm text-teal-ink">
        {t('contact.success')}
      </p>
    );
  }

  return (
    <form action={onSubmit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span className="font-medium">{t('form.firstName')}</span>
          <input
            required
            name="firstName"
            className="h-10 rounded-md border border-line bg-white px-3 outline-none ring-teal-bright/30 focus:ring-2"
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-medium">{t('form.lastName')}</span>
          <input
            name="lastName"
            className="h-10 rounded-md border border-line bg-white px-3 outline-none ring-teal-bright/30 focus:ring-2"
          />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span className="font-medium">{t('form.email')}</span>
          <input
            type="email"
            name="email"
            className="h-10 rounded-md border border-line bg-white px-3 outline-none ring-teal-bright/30 focus:ring-2"
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-medium">{t('form.phone')}</span>
          <input
            name="phone"
            className="h-10 rounded-md border border-line bg-white px-3 outline-none ring-teal-bright/30 focus:ring-2"
          />
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        <span className="font-medium">{t('form.message')}</span>
        <textarea
          name="message"
          rows={4}
          defaultValue={defaultMessage}
          placeholder={t('form.messagePlaceholder')}
          className="rounded-md border border-line bg-white px-3 py-2 outline-none ring-teal-bright/30 focus:ring-2"
        />
      </label>
      {status === 'error' && (
        <p className="text-sm text-red-600">{t('contact.error')}</p>
      )}
      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t('form.sending') : t('form.submit')}
      </Button>
    </form>
  );
}
