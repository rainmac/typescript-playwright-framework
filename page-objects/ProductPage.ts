import { Page, Locator, expect } from "@playwright/test"

export class ProductPage {

    private page: Page
    private productCard: Locator
    private sortItemDropdown: Locator
    private itemPrices: Locator

    constructor(page: Page) {
        this.page = page

        this.productCard = page.getByTestId("product-card")
        this.sortItemDropdown = page.getByTestId("sort-dropdown")
        this.itemPrices = page.locator(".product-price")
    }

    async visit() {
        await this.page.goto("/")
    } 

    async addProductToBasket(productName: string) {
        const addToBasket = this.productCard
                                    .filter({ hasText: productName })
                                    .locator('button[data-qa="product-button"]')
        await addToBasket.waitFor()
        await expect(addToBasket).toHaveText("Add to Basket")
        await addToBasket.click()
        await expect(addToBasket).toHaveText("Remove from Basket")
    }

    async sortByCheapestItem() {
        await this.sortItemDropdown.waitFor()
        await this.sortItemDropdown.selectOption("price-asc")
    }

    async verifyItemsSortedByCheapest() {
        this.itemPrices.first().waitFor()
        const prices = await this.itemPrices.allInnerTexts()
        const priceNumbers = prices.map(price => {
            return parseInt(price.replace("$", ""))
        })
        await expect(this.checkIfSorted(priceNumbers)).toEqual(true)
    }

    private checkIfSorted(arr: Array<number>) {
        return arr.every((value, index, array) => 
                        index === 0 || value >= array[index - 1]
                    );
    }

}