# Nekera — strona klienta

Publiczna strona nieruchomości. **Jedna aplikacja** serwuje wszystkie agencje: tenant wynika z hosta `https://{slug}.sites.nekera.app`.

Deploy produkcji jest **tylko z dashboardu Cloudflare** (Git connected). Nie ma GitHub Actions.

## Uruchomienie lokalne

```bash
cp .env.example .env.local
npm install
npm run dev
```

- `http://localhost:3001/pl` — używa `NEXT_PUBLIC_TENANT_SLUG` z `.env.local`
- `http://acme-realty.sites.localhost:3001/pl` — slug z hosta (`*.localhost` działa w przeglądarkach)

Backend: `npm run start:dev` w `nekera-backend`.

## Produkcja (Cloudflare Dashboard)

Workers & Pages → `nekera-client-website` → **Settings → Build**:

| Pole | Komenda |
|------|---------|
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Non-production deploy | `npx opennextjs-cloudflare upload` |

Zmienna builda: `NEXT_PUBLIC_API_URL=https://api.nekera.app` (bez `NEXT_PUBLIC_TENANT_SLUG`).

`npm run build` zostaje jako `next build` — OpenNext sam go woła. Nie ustawiaj builda na `npm run build`.

**Domains & Routes** (jednorazowo, w tym samym Workerze):

- `sites.nekera.app`
- `*.sites.nekera.app`

Jako **custom domain** Workera, nie CNAME na `*.workers.dev` jako origin.

Push na `main` w tym repo odpala build w Cloudflare. Nowy tenant nie wymaga nowego projektu.

## Dane publiczne

Slug z `Host`, potem:

- `GET /api/public/:slug/agency`
- `GET /api/public/:slug/listings` (+ recent / `:id` / similar)
- `GET /api/public/:slug/locations`
- `GET /api/public/:slug/listing-types`
- `GET /api/public/:slug/agents`
- `POST /api/public/:slug/inquiries`
