import {CartItem} from "~/scripts/data/cart-item";

export interface CheckoutRequest {
    name: string;
    phoneNumber: string;
    email: string;
    comment?: string;
    address: string;
    cartItems: CartItem[];
}
