import {defineStore} from 'pinia'
import {AddToCartRequest} from "~/scripts/request-models/add-to-cart-request";
import Authentication from "~/scripts/http/authentication";
import {accessToken, getAuthentication} from "~/scripts/authentication-storage";
import {LocalUserCart} from "~/scripts/stores/local-user-cart";
import {CartRequestGroup} from "~/scripts/requests-groups/cart-request-group";

export const useUserStore = defineStore('user', {
    state: () => ({
        productsInCart: 0,
        name: 'Eduardo',
    }),
    getters: {
        getProductsInCart: (state) => state.productsInCart,
    },
    actions: {
        async syncWithLocalstorage(){
            const cartRequest = new CartRequestGroup(getAuthentication());
            await cartRequest.getCartProductsCount(x => this.productsInCart = x);
            new LocalUserCart().set(this.productsInCart);
        },
        async addProductToCart(request: AddToCartRequest) {
            const authentication: Authentication = {
                token: accessToken.value
            };
            const cartRequests = new CartRequestGroup(authentication);

            const response = await cartRequests.addToCart(request);
            if (response.errors == null) {
                this.productsInCart++;
                const localUserCart = new LocalUserCart();
                localUserCart.add(1);
            }
        },
    },
})