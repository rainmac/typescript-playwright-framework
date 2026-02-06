import { test } from "@playwright/test"
import { MyAccount } from "../page-objects/MyAccountPage"
import { getLoginToken } from "../api-calls/getLoginToken"
import { Navigation } from "../page-objects/Navigation"
import { ProductPage } from "../page-objects/ProductPage"
import { adminDetails } from "../data/userDetails"

test("My Account using cookie injection", async({ page }) => {

    const loginToken = await getLoginToken(adminDetails.username!, adminDetails.password!)
    
    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({
                message: "PLAYRIGHT ERROR FROM MOCKING"
            })
        })
    })

    const productPage = new ProductPage(page)
    await productPage.visit()

    // inject the login token into the browser
    const navigation = new Navigation(page)
    await navigation.insertDefaultUserLoginCookie(loginToken)
    
    const myAccount = new MyAccount(page)
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()
})