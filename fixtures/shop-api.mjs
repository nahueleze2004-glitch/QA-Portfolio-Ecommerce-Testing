import http from 'node:http';
import { randomUUID } from 'node:crypto';

// Local contract-testing fixture. Not the backend of Swag Labs.
const products = [
  { id: 1, name: 'Backpack', priceCents: 2999, stock: 3 },
  { id: 2, name: 'Bike light', priceCents: 999, stock: 0 },
];
const sessions = new Map();
const orders = new Map();
const send = (res, status, data) => {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(data));
};

async function body(req) {
  let text = '';
  for await (const chunk of req) {
    text += chunk;
    if (text.length > 16384) throw new Error('BODY_TOO_LARGE');
  }
  return JSON.parse(text || '{}');
}

const server = http.createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  try {
    if (req.method === 'GET' && path === '/health') return send(res, 200, { status: 'ok' });
    if (req.method === 'GET' && path === '/products') return send(res, 200, { products });
    if (req.method === 'POST' && path === '/auth/login') {
      const data = await body(req);
      if (!['buyer-a', 'buyer-b'].includes(data.username) || data.password !== 'demo-only') {
        return send(res, 401, { error: 'INVALID_CREDENTIALS' });
      }
      const token = randomUUID();
      sessions.set(token, data.username);
      return send(res, 200, { token, tokenType: 'Bearer' });
    }

    const token = (req.headers.authorization || '').replace(/^Bearer /, '');
    const user = sessions.get(token);
    if (!user) return send(res, 401, { error: 'UNAUTHORIZED' });
    if (req.method === 'POST' && path === '/auth/logout') {
      sessions.delete(token);
      return send(res, 200, { loggedOut: true });
    }
    if (req.method === 'POST' && path === '/orders') {
      const data = await body(req);
      if (!Number.isInteger(data.productId) || !Number.isInteger(data.quantity) || data.quantity < 1 || data.quantity > 10) {
        return send(res, 400, { error: 'INVALID_ORDER' });
      }
      const product = products.find(p => p.id === data.productId);
      if (!product) return send(res, 404, { error: 'PRODUCT_NOT_FOUND' });
      if (product.stock < data.quantity) return send(res, 409, { error: 'INSUFFICIENT_STOCK' });
      const subtotalCents = product.priceCents * data.quantity;
      const taxCents = Math.round(subtotalCents * 0.08);
      const order = { id: randomUUID(), user, productId: product.id, quantity: data.quantity,
        subtotalCents, taxCents, totalCents: subtotalCents + taxCents, status: 'confirmed' };
      product.stock -= data.quantity;
      orders.set(order.id, order);
      return send(res, 201, order);
    }
    if (req.method === 'GET' && path.startsWith('/orders/')) {
      const order = orders.get(path.split('/')[2]);
      if (!order || order.user !== user) return send(res, 404, { error: 'ORDER_NOT_FOUND' });
      return send(res, 200, order);
    }
    return send(res, 404, { error: 'NOT_FOUND' });
  } catch (error) {
    if (error instanceof SyntaxError) return send(res, 400, { error: 'INVALID_JSON' });
    if (error.message === 'BODY_TOO_LARGE') return send(res, 413, { error: 'BODY_TOO_LARGE' });
    return send(res, 500, { error: 'INTERNAL_ERROR' });
  }
});

server.listen(Number(process.env.PORT || 0), '127.0.0.1', () => {
  const address = server.address();
  const baseURL = `http://127.0.0.1:${address.port}`;
  if (process.send) process.send({ baseURL });
  else console.log(baseURL);
});
process.on('SIGTERM', () => server.close(() => process.exit(0)));
