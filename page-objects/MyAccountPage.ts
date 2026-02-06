import { Locator, Page } from "@playwright/test";

export class MyAccount {

    private page:Page
    private headingMyAccount: Locator
    private headingYourAddress: Locator

    constructor(page:Page) {
        this.page = page
        this.headingMyAccount = page.getByRole('heading', { name: 'My Account' })
        this.headingYourAddress = page.getByRole('heading', { name: 'Your address' })
    }

    async visit() {
        await this.page.goto("/my-account")
    }

    async waitForPageHeading() {
        await this.headingMyAccount.waitFor()
        await this.headingYourAddress.waitFor()
    }

}