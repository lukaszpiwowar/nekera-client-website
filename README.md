# Nekera — strona klienta

Publiczna strona nieruchomości (sprzedaż / wynajem) oparta o ten sam układ co Houzit: Next.js App Router, cienkie `page.tsx`, widoki w `src/views`, dane z API `/api/public/:tenantSlug`.

## Stack

- Next.js 16 (App Router) + React 19
- next-intl (`pl`, `en`, `sr`) i zlokalizowane ścieżki (`/sprzedaz`, `/prodaja`, …)
- Tailwind CSS 4, tokeny kolorystyczne z Nekera CRM
- Backend: `nekera-backend` — moduł `public-website`

## Uruchomienie

```bash
cp .env.example .env.local
# NEXT_PUBLIC_TENANT_SLUG = slug agencji z CRM (np. acme-realty)
# NEXT_PUBLIC_API_URL = http://localhost:3000
npm install
npm run dev
```

Strona: [http://localhost:3001/pl](http://localhost:3001/pl)

Backend musi działać na `http://localhost:3000` (`npm run start:dev` w `nekera-backend`). Oferty na stronie to wyłącznie listingi ze statusem `active`.

## Strony

| Ścieżka (PL) | Opis |
|--------------|------|
| `/pl` | Home — hero, polecane oferty, agenci, CTA |
| `/pl/sprzedaz` | Wyszukiwarka sprzedaży (filtry GET) |
| `/pl/wynajem` | Wyszukiwarka wynajmu |
| `/pl/sprzedaz/[id]` | Karta oferty + podobne + formularz leadu |
| `/pl/o-nas` | O agencji |
| `/pl/kontakt` | Formularz zapytania → `POST /api/public/:slug/inquiries` |

## Dane publiczne

Klient woła wyłącznie nieautoryzowane endpointy:

- `GET /api/public/:slug/agency`
- `GET /api/public/:slug/listings`
- `GET /api/public/:slug/listings/recent`
- `GET /api/public/:slug/listings/:id`
- `GET /api/public/:slug/listings/:id/similar`
- `GET /api/public/:slug/locations`
- `GET /api/public/:slug/listing-types`
- `GET /api/public/:slug/agents`
- `POST /api/public/:slug/inquiries`
