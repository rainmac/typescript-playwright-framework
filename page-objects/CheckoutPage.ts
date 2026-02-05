import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {

    private page: Page
    private basketItemCards: Locator
    private basketItemPrices: Locator
    private basketItemRemoveButton: Locator
    private continueToCheckoutButton: Locator

    constructor(page: Page) {
        this.page = page

        this.basketItemCards = page.getByTestId("basket-card")
        this.basketItemPrices = page.getByTestId("basket-item-price")
        this.basketItemRemoveButton = page.getByRole("button", { name: "Remove from basket" })
        this.continueToCheckoutButton = page.getByRole("button", { name: "Continue to Checkout"})
    }

    async removeCheapestItem() {
        const itemPrices = await this.basketItemPrices.allInnerTexts()
        const justNumbers = itemPrices.map(element => {
            const itemPriceWithoutDollarSign = element.replace("$", "")
            return parseInt(itemPriceWithoutDollarSign)
        })
        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice)
        const smallestPriceRemoveButton = await this.basketItemRemoveButton.nth(smallestPriceIndex)
        await smallestPriceRemoveButton.waitFor()
        await smallestPriceRemoveButton.click()
    }

    async verifyBasketItemCount(itemCount: number) {
        await expect(this.basketItemCards).toHaveCount(itemCount)
    }

    async continueToCheckout() {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, { timeout: 3000 })
    }
}