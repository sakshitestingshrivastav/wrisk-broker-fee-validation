import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

test.describe.skip('Existing Customer Quote Validation', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        const username = process.env.EXISTING_USERNAME;
        const password = process.env.EXISTING_USER_PASSWORD;

        await loginPage.navigateToLoginPage();

        if (!username || !password) {
            throw new Error('USERNAME or PASSWORD is missing');
            }

        await loginPage.login(
            username,
            password
        );

    });

    test('Verify existing customer quote details are displayed', async ({ page }) => {

        await page.goto('/quote');

        await expect(
            page.getByTestId('brand')
        ).toBeVisible();

        await expect(
            page.getByTestId('premium')
        ).toBeVisible();

        await expect(
            page.getByTestId('total')
        ).toBeVisible();

        await expect(
            page.getByTestId('expiry-date')
        ).toBeVisible();

    });

    test('Verify quote values are displayed in currency format', async ({ page }) => {

        await expect(
            page.getByTestId('premium')
        ).toContainText('£');

        await expect(
            page.getByTestId('total')
        ).toContainText('£');

    });

    test('Verify broker related charges are not displayed for existing customer', async ({ page }) => {

    const quoteSection = page.getByTestId('quote-breakdown');

    await expect(quoteSection)
        .not.toContainText(/broker/i);

    });

     test('Verify total excludes broker fee for existing customer', async ({ page }) => {

        const premium = Number(
            (await page.getByTestId('premium').textContent())
                ?.replace('£', '')
        );

        const total = Number(
            (await page.getByTestId('total').textContent())
                ?.replace('£', '')
        );

        expect(total).toBe(
            premium
        );

    });

});