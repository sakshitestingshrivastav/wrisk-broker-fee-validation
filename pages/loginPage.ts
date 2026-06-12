import { Page } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

    usernameTextbox = '[data-testid="username"]';
    passwordTextbox = '[data-testid="password"]';
    loginButton = '[data-testid="login-button"]';

    async navigateToLoginPage() {
        await this.page.goto('/login');
    }

    async login(username: string, password: string) {

        await this.page.fill(this.usernameTextbox, username);

        await this.page.fill(this.passwordTextbox, password);

        await this.page.click(this.loginButton);

    }

}