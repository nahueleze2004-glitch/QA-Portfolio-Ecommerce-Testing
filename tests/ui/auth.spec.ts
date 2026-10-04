import { test, expect } from '@playwright/test';
import { ShopPage } from '../../pages/ShopPage';

test('UI-AUTH-01 | valid credentials open the inventory', async ({ page }) => {
  await new ShopPage(page).login();
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.getByTestId('title')).toHaveText('Products');
  await expect(page.getByTestId('inventory-item')).toHaveCount(6);
});

for (const scenario of [
  { id: '02', user: 'locked_out_user', password: 'secret_sauce', error: 'Sorry, this user has been locked out.' },
  { id: '03', user: 'standard_user', password: 'wrong-password', error: 'Username and password do not match' },
  { id: '04', user: '', password: 'secret_sauce', error: 'Username is required' },
  { id: '05', user: 'standard_user', password: '', error: 'Password is required' },
]) {
  test(`UI-AUTH-${scenario.id} | ${scenario.error}`, async ({ page }) => {
    await new ShopPage(page).login(scenario.user, scenario.password);
    await expect(page.getByTestId('error')).toContainText(scenario.error);
    await expect(page).not.toHaveURL(/\/inventory\.html$/);
    await expect(page.getByTestId('login-button')).toBeVisible();
  });
}

test('UI-AUTH-06 | logout prevents direct access to inventory', async ({ page }) => {
  await new ShopPage(page).login();
  await page.locator('#react-burger-menu-btn').click();
  await page.getByTestId('logout-sidebar-link').click();
  await expect(page.getByTestId('login-button')).toBeVisible();
  await page.goto('/inventory.html');
  await expect(page.getByTestId('login-button')).toBeVisible();
  await expect(page).not.toHaveURL(/\/inventory\.html$/);
});
