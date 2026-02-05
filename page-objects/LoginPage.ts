import { Locator, Page } from "@playwright/test";

export class LoginPage {

    private page: Page
    private registerButton: Locator

    constructor(page: Page) {
        this.page = page

        this.registerButton = page.getByRole("button", { name: "Register" })
    }

    async clickRegisterUserButton() {
        await this.registerButton.click()
    }
}