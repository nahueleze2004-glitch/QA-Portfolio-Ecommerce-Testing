import { expect, type Page } from '@playwright/test';

export class ShopPage {
  constructor(readonly page: Page) {}

  async login(username = 'standard_user', password = 'secret_sauce') {
    await this.page.goto('/');
    await this.page.getByTestId('username').fill(username);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-button').click();
  }

  async addBackpack() {
    await this.page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(this.page.getByTestId('shopping-cart-badge')).toHaveText('1');
  }

  async startCheckout() {
    await this.login();
    await this.addBackpack();
    await this.page.getByTestId('shopping-cart-link').click();
    await this.page.getByTestId('checkout').click();
  }
}
