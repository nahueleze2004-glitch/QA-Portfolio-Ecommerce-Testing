import { test, expect } from '@playwright/test';
import { ShopPage } from '../../pages/ShopPage';

test.beforeEach(async ({ page }) => { await new ShopPage(page).login(); });

test('UI-CART-01 | selected product persists after reload', async ({ page }) => {
  await new ShopPage(page).addBackpack();
  await page.reload();
  await page.getByTestId('shopping-cart-link').click();
  await expect(page.getByTestId('inventory-item')).toHaveCount(1);
  await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
  await expect(page.getByTestId('inventory-item-price')).toHaveText('$29.99');
});

test('UI-CART-02 | removal empties the cart and clears its badge', async ({ page }) => {
  await new ShopPage(page).addBackpack();
  await page.getByTestId('shopping-cart-link').click();
  await page.getByTestId('remove-sauce-labs-backpack').click();
  await expect(page.getByTestId('inventory-item')).toHaveCount(0);
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
});

test('UI-CATALOG-01 | price sorting orders all products numerically', async ({ page }) => {
  await page.getByTestId('product-sort-container').selectOption('lohi');
  const prices = (await page.getByTestId('inventory-item-price').allTextContents())
    .map(value => Number(value.replace('$', '')));
  expect(prices).toHaveLength(6);
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});
