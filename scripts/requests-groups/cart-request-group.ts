import RequestsBase from "~/scripts/requests-groups/requests-base";
import Authentication from "~/scripts/http/authentication";
import {CartItem} from "~/scripts/data/cart-item";
import {AddToCartRequest} from "~/scripts/request-models/add-to-cart-request";
import {CheckoutRequest} from "~/scripts/request-models/checkout-request";
import {UpdateProductPurchasedCount} from "~/scripts/data/update-product-purchased-count";
import {UnauthorizedHandler} from "~/scripts/http/not-authorized-error-handler";

export class CartRequestGroup extends RequestsBase {
    constructor(authentication: Authentication) {
        super("cart", authentication);
    }

    async getCartProductsCount(onSuccess: (x: number) => any) {
        return await this.httpClient.get<number>("count", onSuccess);
    }

    async getItems(onSuccess: (x: CartItem[]) => any) {
        return await this.httpClient.get<CartItem[]>("", onSuccess);
    }

    async addToCart(payload: AddToCartRequest, onSuccess?: (x: CartItem) => any) {
        const unauthorizedHandler = new UnauthorizedHandler();
        return await this.httpClient.put<AddToCartRequest, any>("", payload, onSuccess, [unauthorizedHandler]);
    }

    async removeItem(itemId: number) {
        return await this.httpClient.delete(`/item/${itemId}`);
    }

    async checkout(payload: CheckoutRequest) {
        return await this.httpClient.post("checkout", payload);
    }
    
    async updatePurchasedCount(payload: UpdateProductPurchasedCount[]){
        return await this.httpClient.put("purchased-count", payload);
    }
}