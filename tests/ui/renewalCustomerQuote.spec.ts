import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

test.describe.skip('Renewal Customer Quote Validation', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);

        const username = process.env.RENEWAL_USERNAME;
        const password = process.env.RENEWAL_USER_PASSWORD;

        await loginPage.navigateToLoginPage();

        if (!username || !password) {
            throw new Error('USERNAME or PASSWORD is missing');
        }

        await loginPage.login(
            username,
            password
        );

        await page.goto('/quote');

    });

    test('Verify renewal customer quote details are displayed', async ({ page }) => {

        await expect(page.getByTestId('brand')).toBeVisible();

        await expect(page.getByTestId('premium')).toBeVisible();

        await expect(page.getByTestId('tax')).toBeVisible();

        await expect(page.getByTestId('broker-fee')).toBeVisible();

        await expect(page.getByTestId('total')).toBeVisible();

        await expect(page.getByTestId('expiry-date')).toBeVisible();

    });

    test('Verify broker fee is displayed as separate line item', async ({ page }) => {

        await expect(
            page.getByTestId('broker-fee')
        ).toBeVisible();

    });

    test('Verify broker fee amount is £1.25', async ({ page }) => {

        await expect(
            page.getByTestId('broker-fee')
        ).toHaveText('£1.25');

    });

    test('Verify quote values are displayed in currency format', async ({ page }) => {

        await expect(page.getByTestId('premium'))
            .toContainText('£');

        await expect(page.getByTestId('tax'))
            .toContainText('£');

        await expect(page.getByTestId('broker-fee'))
            .toContainText('£');

        await expect(page.getByTestId('total'))
            .toContainText('£');

    });

    test('Verify total includes broker fee for renewal customer', async ({ page }) => {

        const premium = Number(
            (await page.getByTestId('premium').textContent())
                ?.replace('£', '')
        );

        const tax = Number(
            (await page.getByTestId('tax').textContent())
                ?.replace('£', '')
        );

        const brokerFee = Number(
            (await page.getByTestId('broker-fee').textContent())
                ?.replace('£', '')
        );

        const total = Number(
            (await page.getByTestId('total').textContent())
                ?.replace('£', '')
        );

        expect(total).toBe(
            premium + tax + brokerFee
        );

    });

});