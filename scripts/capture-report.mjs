import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const server = spawn(process.execPath, [
  'node_modules/@playwright/test/cli.js', 'show-report', 'playwright-report',
  '--host', '127.0.0.1', '--port', '9323',
], { stdio: 'inherit' });
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      if ((await fetch('http://127.0.0.1:9323')).ok) { ready = true; break; }
    } catch {}
    await delay(100);
  }
  if (!ready) throw new Error('Playwright report server did not start');
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, deviceScaleFactor: 1, colorScheme: 'light' });
  await page.goto('http://127.0.0.1:9323', { waitUntil: 'networkidle' });
  await page.getByText('auth.spec.ts', { exact: false }).first().waitFor();
  await page.evaluate(() => document.fonts.ready);
  await mkdir('test-results', { recursive: true });
  await page.screenshot({ path: 'test-results/report-preview.png', fullPage: false });
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
