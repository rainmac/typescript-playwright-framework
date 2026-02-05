import{ Locator, Page } from "@playwright/test"

export class DeliveryDetailsPage {

    private page: Page
    private firstName: Locator
    private lastName: Locator
    private street: Locator
    private postCode: Locator
    private city: Locator
    private country: Locator
    private saveAddressButton: Locator
    private continueButton: Locator

    constructor(page: Page) {
        this.page = page

        this.firstName = page.getByPlaceholder("First name")
        this.lastName = page.getByPlaceholder("Last name")
        this.street = page.getByPlaceholder("Street")
        this.postCode = page.getByPlaceholder("Post code")
        this.city = page.getByPlaceholder("City")
        this.country = page.getByTestId("country-dropdown")

        this.saveAddressButton = page.getByRole("button", { name: "Save address for next time" })
        this.continueButton = page.getByRole("button", { name: "Continue to payment" })
    }

    async fillOutDeliveryDetails(deliveryDetails: any) {
        await this.firstName.waitFor()
        await this.firstName.fill(deliveryDetails.firstName)
        await this.lastName.fill(deliveryDetails.lastName)
        await this.street.fill(deliveryDetails.street)
        await this.postCode.fill(deliveryDetails.postCode)
        await this.city.fill(deliveryDetails.city)
        await this.country.selectOption(deliveryDetails.country)
    }

    async continueToPayment() {
        await this.continueButton.click()
    }

}