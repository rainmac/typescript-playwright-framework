import { expect, Locator, Page } from "@playwright/test";

export class Navigation {

    readonly page: Page
    readonly basketCount: Locator
    readonly checkoutLink: Locator

    constructor(page: Page) {
        this.page = page

        this.basketCount = page.getByTestId("header-basket-count")
        this.checkoutLink = page.getByRole('link', { name: "Checkout" })
    }

    async verifyBasketItemCount(itemCount: number) {
        await expect(this.basketCount).toHaveText(String(itemCount))
    }

    async goToCheckout() {
        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")
    }
}