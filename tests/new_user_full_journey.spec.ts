import { v4 as uuidv4 } from "uuid"
import { test } from "@playwright/test"
import { ProductPage } from "../page-objects/ProductPage"
import { Navigation } from "../page-objects/Navigation"
import { CheckoutPage } from "../page-objects/CheckoutPage"
import { SignUpPage } from "../page-objects/SignupPage"
import { LoginPage } from "../page-objects/LoginPage"
import { DeliveryDetailsPage } from "../page-objects/DeliveryDetailsPage"
import { PaymentPage } from "../page-objects/PaymentPage"
import { ThankYouPage } from "../page-objects/ThankYouPage"
import { deliveryDetails as userAddress} from "../data/deliveryDetails.js"

test.only("New user full end-to-end test journey", async({ page }) => {

    const productPage = new ProductPage(page)
    const navigation = new Navigation(page)
    
    await productPage.visit()

    // sort by the cheapest item
    await productPage.sortByCheapestItem()
    await productPage.verifyItemsSortedByCheapest()

    // add 3 items to basket
    if (navigation.isDesktop()) {
        await navigation.verifyBasketItemCount(0)
    }
    
    await productPage.addProductToBasket("Astronaut dabbing")
    await productPage.addProductToBasket("Baby Zebra with butterfly")
    await productPage.addProductToBasket("Young Man in hot air balloon")
    
    if (navigation.isDesktop()) {
        await navigation.verifyBasketItemCount(3)
    }

    // proceed to checkout
    await navigation.goToCheckout()
    
    // remove cheapest item
    const checkoutPage = new CheckoutPage(page)

    if (navigation.isDesktop()) {
        await navigation.verifyBasketItemCount(3)
    }
    await checkoutPage.verifyBasketItemCount(3)
    await checkoutPage.removeCheapestItem()
    
    if (navigation.isDesktop()) {
        await navigation.verifyBasketItemCount(2)
    }
    await checkoutPage.verifyBasketItemCount(2)

    // continue to checkout
    await checkoutPage.continueToCheckout()

    // login page
    const loginPage = new LoginPage(page)
    await loginPage.clickRegisterUserButton()
    
    // Sign-up
    const signUpPage = new SignUpPage(page)
    const email = uuidv4() + "@test.com"
    await signUpPage.register(email, "password123")
    
    // Enter delivery details
    const deliveryDetailsPage = new DeliveryDetailsPage(page);
    await deliveryDetailsPage.fillOutDeliveryDetails(userAddress)
    await deliveryDetailsPage.continueToPayment()

    // Enter payment details
    const paymentDetailsPage = new PaymentPage(page)
    await paymentDetailsPage.getDiscount()
    await paymentDetailsPage.fillOutCreditCardInfo("Reiner Tolentino", "1234567890123456", "0227", "2345")
    await paymentDetailsPage.pay()

    // validate thank you
    const thankYouPage = new ThankYouPage(page)
    await thankYouPage.validateUrl()
})