import { test, expect, login } from './fixtures';

test('API-01 | catalog returns typed product data', async ({ api }) => {
  const response = await api.get('/products');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  const { products } = await response.json();
  expect(products).toHaveLength(2);
  expect(products[0]).toEqual({ id: 1, name: 'Backpack', priceCents: 2999, stock: 3 });
  expect(new Set(products.map((p: { id: number }) => p.id)).size).toBe(products.length);
});

test('API-02 | valid credentials issue a bearer token', async ({ api }) => { await login(api); });

test('API-03 | invalid credentials do not issue a token', async ({ api }) => {
  const response = await api.post('/auth/login', { data: { username: 'buyer-a', password: 'wrong' } });
  expect(response.status()).toBe(401);
  expect(await response.json()).toEqual({ error: 'INVALID_CREDENTIALS' });
});

for (const scenario of [
  { id: '04', name: 'missing token', headers: {} as Record<string, string> },
  { id: '05', name: 'invalid token', headers: { Authorization: 'Bearer invalid' } },
]) {
  test(`API-${scenario.id} | rejects ${scenario.name}`, async ({ api }) => {
    const response = await api.post('/orders', { headers: scenario.headers, data: { productId: 1, quantity: 1 } });
    expect(response.status()).toBe(401);
    expect(await response.json()).toEqual({ error: 'UNAUTHORIZED' });
  });
}

test('API-06 | create and retrieve an order with exact totals', async ({ api }) => {
  const headers = await login(api);
  const response = await api.post('/orders', { headers, data: { productId: 1, quantity: 2 } });
  expect(response.status()).toBe(201);
  const order = await response.json();
  expect(order).toMatchObject({ productId: 1, quantity: 2, subtotalCents: 5998, taxCents: 480, totalCents: 6478, status: 'confirmed' });
  expect(order.id).toEqual(expect.any(String));
  const stored = await api.get(`/orders/${order.id}`, { headers });
  expect(stored.status()).toBe(200);
  expect(await stored.json()).toEqual(order);
  const { products } = await (await api.get('/products')).json();
  expect(products[0].stock).toBe(1);
});

for (const [index, quantity] of [0, -1, 1.5, 11].entries()) {
  test(`API-${String(7 + index).padStart(2, '0')} | rejects quantity ${quantity} without consuming stock`, async ({ api }) => {
    const response = await api.post('/orders', { headers: await login(api), data: { productId: 1, quantity } });
    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({ error: 'INVALID_ORDER' });
    const { products } = await (await api.get('/products')).json();
    expect(products[0].stock).toBe(3);
  });
}

test('API-11 | unknown product returns 404', async ({ api }) => {
  const response = await api.post('/orders', { headers: await login(api), data: { productId: 999, quantity: 1 } });
  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({ error: 'PRODUCT_NOT_FOUND' });
});

test('API-12 | unavailable stock rejects the order', async ({ api }) => {
  const response = await api.post('/orders', { headers: await login(api), data: { productId: 2, quantity: 1 } });
  expect(response.status()).toBe(409);
  expect(await response.json()).toEqual({ error: 'INSUFFICIENT_STOCK' });
});

test('API-13 | another customer cannot retrieve an order', async ({ api }) => {
  const headers = await login(api);
  const created = await api.post('/orders', { headers, data: { productId: 1, quantity: 1 } });
  expect(created.status()).toBe(201);
  const order = await created.json();
  const response = await api.get(`/orders/${order.id}`, { headers: await login(api, 'buyer-b') });
  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({ error: 'ORDER_NOT_FOUND' });
});

test('API-14 | logout revokes access with the same token', async ({ api }) => {
  const headers = await login(api);
  expect((await api.post('/auth/logout', { headers })).status()).toBe(200);
  const response = await api.post('/orders', { headers, data: { productId: 1, quantity: 1 } });
  expect(response.status()).toBe(401);
  expect(await response.json()).toEqual({ error: 'UNAUTHORIZED' });
});

test('API-15 | malformed JSON returns a client error', async ({ api }) => {
  const response = await api.post('/orders', {
    headers: { ...await login(api), 'Content-Type': 'application/json' }, data: Buffer.from('{broken'),
  });
  expect(response.status()).toBe(400);
  expect(await response.json()).toEqual({ error: 'INVALID_JSON' });
});

test('API-16 | stock cannot be oversold across sequential orders', async ({ api }) => {
  const headers = await login(api);
  expect((await api.post('/orders', { headers, data: { productId: 1, quantity: 3 } })).status()).toBe(201);
  expect((await api.post('/orders', { headers, data: { productId: 1, quantity: 1 } })).status()).toBe(409);
  const { products } = await (await api.get('/products')).json();
  expect(products[0].stock).toBe(0);
});
