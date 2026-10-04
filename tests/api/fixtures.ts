import { test as base, expect, type APIRequestContext } from '@playwright/test';
import { fork } from 'node:child_process';
import path from 'node:path';

export const test = base.extend<{ api: APIRequestContext }>({
  api: async ({ playwright }, use) => {
    const child = fork(path.resolve('fixtures/shop-api.mjs'), [], { stdio: ['ignore', 'ignore', 'pipe', 'ipc'] });
    let context: APIRequestContext | undefined;
    try {
      const baseURL = await new Promise<string>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Fixture API did not start')), 10_000);
        child.once('message', (message: { baseURL: string }) => { clearTimeout(timer); resolve(message.baseURL); });
        child.once('error', error => { clearTimeout(timer); reject(error); });
        child.once('exit', code => { clearTimeout(timer); reject(new Error(`Fixture API exited: ${code}`)); });
      });
      context = await playwright.request.newContext({ baseURL });
      await use(context);
    } finally {
      await context?.dispose();
      if (child.exitCode === null) {
        const closed = new Promise<void>(resolve => child.once('exit', () => resolve()));
        child.kill('SIGTERM');
        await closed;
      }
    }
  },
});
export { expect };

export async function login(api: APIRequestContext, username = 'buyer-a') {
  const response = await api.post('/auth/login', { data: { username, password: 'demo-only' } });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.tokenType).toBe('Bearer');
  expect(body.token).toEqual(expect.any(String));
  return { Authorization: `Bearer ${body.token}` };
}
