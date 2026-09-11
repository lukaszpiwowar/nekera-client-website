# Nekera — strona klienta

Publiczna strona nieruchomości. **Jedna aplikacja** serwuje wszystkie agencje: tenant wynika z hosta `https://{slug}.sites.nekera.app`.

## Uruchomienie lokalne

```bash
cp .env.example .env.local
npm install
npm run dev
```

- `http://localhost:3001/pl` — używa `NEXT_PUBLIC_TENANT_SLUG` z `.env.local`
- `http://acme-realty.sites.localhost:3001/pl` — slug z hosta (`*.localhost` działa w przeglądarkach)

Backend: `npm run start:dev` w `nekera-backend`.

## Produkcja (Cloudflare)

Jednorazowy deploy (OpenNext → Worker). Nowy tenant **nie** wymaga nowego projektu — wystarczy `*.sites.nekera.app`.

```bash
cp .dev.vars.example .dev.vars   # tylko lokalny preview
npm run cf-build
npx wrangler deploy
# albo: npm run deploy
```

Env builda: `NEXT_PUBLIC_API_URL=https://api.nekera.app` (bez `NEXT_PUBLIC_TENANT_SLUG`).

GitHub (repo **nekera-client-website**, nie golem-n8n): sekrety `CLOUDFLARE_API_TOKEN` (Workers + Account) i `CLOUDFLARE_ACCOUNT_ID`. Token z Caddy (`CF_API_TOKEN`) to inny sekret.

Po udanym deployu Actions wypisze `*.workers.dev`. Ten hostname wklej jako `NEKERA_SITES_CNAME_TARGET` w **golem-n8n**, albo ręcznie w CF:

1. `CNAME sites` → `{worker}.{account}.workers.dev` (proxied)
2. `CNAME *.sites` → ten sam target (proxied)
3. Smoke: `https://{slug}.sites.nekera.app`

## Dane publiczne

Slug z `Host`, potem:

- `GET /api/public/:slug/agency`
- `GET /api/public/:slug/listings` (+ recent / `:id` / similar)
- `GET /api/public/:slug/locations`
- `GET /api/public/:slug/listing-types`
- `GET /api/public/:slug/agents`
- `POST /api/public/:slug/inquiries`
