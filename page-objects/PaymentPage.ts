import { expect, FrameLocator, Locator, Page } from "@playwright/test";

export class PaymentPage {

    private page: Page
    private ccOwner: Locator
    private ccNumber: Locator
    private validUntil: Locator
    private cvv: Locator
    private payButton: Locator
    private discountCodeValue: Locator
    private discountCode: Locator
    private submitDiscountButton: Locator
    private totalBill: Locator
    private discountedBillValue: Locator
    private discountIframe: FrameLocator

    constructor(page: Page) {
        this.page = page

        this.ccOwner = page.getByPlaceholder("Credit card owner")
        this.ccNumber =  page.getByPlaceholder("Credit card number")
        this.validUntil = page.getByPlaceholder("Valid until")
        this.cvv = page.getByPlaceholder("Credit card CVC")
        this.payButton = page.getByRole("button", { name: "Pay" })
        this.discountIframe = page.frameLocator("iframe")
        this.discountCodeValue = this.discountIframe.getByTestId("discount-code")
        this.discountCode = page.getByPlaceholder("Discount code")
        this.submitDiscountButton = page.getByRole("button", { name: "Submit discount" })
        this.totalBill = page.getByTestId("total-value")
        this.discountedBillValue = page.getByTestId("total-with-discount-value")
    }

    async fillOutCreditCardInfo(ccOwner:string, ccNumber:string, validity:string, cvv:string) {
        await this.ccOwner.waitFor()
        await this.ccOwner.fill(ccOwner)
        await this.ccNumber.fill(ccNumber)
        await this.validUntil.fill(validity)
        await this.cvv.fill(cvv)
    }

    async getDiscount() {
        await this.totalBill.waitFor()
        const origBill = parseInt((await this.totalBill.innerText()).replace("$", ""))
        await this.discountCodeValue.waitFor()
        const discount = await this.discountCodeValue.innerText()
        await this.discountCode.click()
        await this.discountCode.fill(discount)
        await this.submitDiscountButton.click({ delay: 1000 })
        await this.discountedBillValue.waitFor()
        const discountedBill = parseInt((await this.discountedBillValue.innerText()).replace("$", ""))
        await expect(discountedBill).toBeLessThan(origBill)
    }

    async pay() {
        await this.payButton.click()
    }

}