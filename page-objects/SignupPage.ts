import { Locator, Page } from "@playwright/test";

export class SignUpPage {

    private page: Page
    private email: Locator
    private password: Locator
    private registerButton: Locator

    constructor(page: Page) {
        this.page = page

        this.email = page.getByPlaceholder("E-Mail")
        this.password = page.getByPlaceholder("Password")
        this.registerButton = page.getByRole("button", { name : "Register"})

    }

    async register(username: string, password: string) {
        // await this.page.waitForLoadState("networkidle")
        // await this.page.pause()
        await this.email.waitFor()
        await this.email.click()
        await this.email.pressSequentially(username)
        await this.password.click()
        await this.password.pressSequentially(password)
        await this.registerButton.click()
    }
}