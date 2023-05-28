import RequestsBase from "~/scripts/requests-groups/requests-base";
import Authentication from "~/scripts/http/authentication";
import {CartItem} from "~/scripts/data/cart-item";
import {AddToCartRequest} from "~/scripts/request-models/add-to-cart-request";
import {CheckoutRequest} from "~/scripts/request-models/checkout-request";

export class CartRequestGroup extends RequestsBase {
    constructor(authentication: Authentication) {
        super("cart", authentication);
    }

    async getCartProductsCount(onSuccess: (x: number) => any) {
        return await this.httpClient.get<number>("/count", onSuccess);
    }

    async getItems(onSuccess: (x: CartItem[]) => any) {
        return await this.httpClient.get<CartItem[]>("", onSuccess);
    }

    async addToCart(payload: AddToCartRequest, onSuccess?: (x: any) => any) {
        return await this.httpClient.put<AddToCartRequest, any>("", payload, onSuccess);
    }

    async removeItem(itemId: number) {
        return await this.httpClient.delete(`/item/${itemId}`);
    }

    async checkout(payload: CheckoutRequest) {
        return await this.httpClient.post("checkout", payload);
    }
}