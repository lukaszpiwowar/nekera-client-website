import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { resolveTenantSlug } from './tenant.ts';

describe('resolveTenantSlug', () => {
  it('reads the slug from a sites subdomain', () => {
    assert.equal(
      resolveTenantSlug('acme.sites.nekera.app', ''),
      'acme',
    );
    assert.equal(
      resolveTenantSlug('acme.sites.localhost:3001', ''),
      'acme',
    );
  });

  it('returns null on the sites apex', () => {
    assert.equal(resolveTenantSlug('sites.nekera.app', 'fallback'), null);
    assert.equal(resolveTenantSlug('www.sites.localhost', 'fallback'), null);
  });

  it('uses the env fallback on localhost', () => {
    assert.equal(resolveTenantSlug('localhost:3001', 'acme-realty'), 'acme-realty');
  });
});
