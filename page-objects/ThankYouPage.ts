import { expect, Locator, Page } from "@playwright/test"

export class ThankYouPage {

    private page: Page
    private backToShopButton: Locator

    constructor(page: Page) {
        this.page = page
        this.backToShopButton = page.getByRole("button", { name: "Back to shop"})
    }

    async validateUrl() {
        await this.page.waitForURL("/thank-you")
        await expect(this.backToShopButton).toBeVisible()
    }

}