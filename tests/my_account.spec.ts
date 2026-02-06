import { test } from "@playwright/test"
import { MyAccount } from "../page-objects/MyAccountPage"
import { getLoginToken } from "../api-calls/getLoginToken"
import { Navigation } from "../page-objects/Navigation"
import { ProductPage } from "../page-objects/ProductPage"
import { adminDetails } from "../data/userDetails"

test.only("My Account using cookie injection", async({ page }) => {

    // Visit the site 
    const productPage = new ProductPage(page)
    await productPage.visit()

    // Make a request to get loin token
    const loginToken = await getLoginToken(adminDetails.username!, adminDetails.password!)
    
    // inject the login token into the browser
    const navigation = new Navigation(page)
    await navigation.insertDefaultUserLoginCookie(loginToken)
    
    const myAccount = new MyAccount(page)
    await myAccount.visit()
    await myAccount.waitForPageHeading()
})