import Product from "~/scripts/data/product";
import RequestsBase from "~/scripts/requests-groups/requests-base";

export class ProductRequestGroup extends RequestsBase {
    constructor() {
        super("product");
    }

    async getProduct(productId: number, onSuccess: (x: Product) => any) {
        return await this.httpClient.get(`/${productId}`, onSuccess)
    }
}