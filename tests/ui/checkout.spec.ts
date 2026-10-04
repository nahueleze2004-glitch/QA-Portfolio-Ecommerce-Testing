import { test, expect } from '@playwright/test';
import { ShopPage } from '../../pages/ShopPage';

test.beforeEach(async ({ page }) => { await new ShopPage(page).startCheckout(); });

test('UI-CHECKOUT-01 | totals and order confirmation match the selected product', async ({ page }) => {
  await page.getByTestId('firstName').fill('Test');
  await page.getByTestId('lastName').fill('Buyer');
  await page.getByTestId('postalCode').fill('1629');
  await page.getByTestId('continue').click();
  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
  await expect(page.getByTestId('subtotal-label')).toHaveText('Item total: $29.99');
  await expect(page.getByTestId('tax-label')).toHaveText('Tax: $2.40');
  await expect(page.getByTestId('total-label')).toHaveText('Total: $32.39');
  await page.getByTestId('finish').click();
  await expect(page).toHaveURL(/\/checkout-complete\.html$/);
  await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
});

for (const scenario of [
  { id: '02', missing: 'firstName', message: 'First Name is required' },
  { id: '03', missing: 'lastName', message: 'Last Name is required' },
  { id: '04', missing: 'postalCode', message: 'Postal Code is required' },
]) {
  test(`UI-CHECKOUT-${scenario.id} | requires ${scenario.missing}`, async ({ page }) => {
    for (const [field, value] of Object.entries({ firstName: 'Test', lastName: 'Buyer', postalCode: '1629' })) {
      if (field !== scenario.missing) await page.getByTestId(field).fill(value);
    }
    await page.getByTestId('continue').click();
    await expect(page.getByTestId('error')).toContainText(scenario.message);
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });
}
