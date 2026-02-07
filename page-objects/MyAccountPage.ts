import { expect, Locator, Page } from "@playwright/test";

export class MyAccount {

    private page:Page
    private headingMyAccount: Locator
    private headingYourAddress: Locator
    private errorMessage: Locator

    constructor(page:Page) {
        this.page = page
        this.headingMyAccount = page.getByRole('heading', { name: 'My Account' })
        this.headingYourAddress = page.getByRole('heading', { name: 'Your address' })
        this.errorMessage = page.getByTestId("error-message")
    }

    async visit() {
        await this.page.goto("/my-account")
    }

    async waitForPageHeading() {
        await this.headingMyAccount.waitFor()
        await this.headingYourAddress.waitFor()
    }

    async waitForErrorMessage() {
        await this.errorMessage.waitFor()
    }

}