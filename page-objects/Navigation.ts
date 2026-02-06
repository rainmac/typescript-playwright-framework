import { expect, Locator, Page } from "@playwright/test";

export class Navigation {

    readonly page: Page
    readonly basketCount: Locator
    readonly checkoutLink: Locator
    readonly burgerButton: Locator

    constructor(page: Page) {
        this.page = page

        this.basketCount = page.getByTestId("header-basket-count")
        this.checkoutLink = page.getByRole('link', { name: "Checkout" })
        this.burgerButton = page.getByTestId("burger-button")
    }

    isDesktop() {
        const viewPort = this.page.viewportSize()
        if (viewPort && viewPort.width >= 600) {
            return true
        }
        return false
    }

    async insertDefaultUserLoginCookie(token: string) {
        await this.page.evaluate(([loginToken]) => {
            document.cookie = "token=" + loginToken
        }, [token])
    }

    async verifyBasketItemCount(itemCount: number) {
        await expect(this.basketCount).toBeVisible()
        await expect(this.basketCount).toHaveText(String(itemCount))
    }

    async goToCheckout() {
        // when mobile, click he burger menu first
        if (!this.isDesktop()) {
            this.burgerButton.waitFor()
            this.burgerButton.click()
        }
        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")
    }
}