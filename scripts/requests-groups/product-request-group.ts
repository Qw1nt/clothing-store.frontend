import Product from "~/scripts/data/product";
import RequestsBase from "~/scripts/requests-groups/requests-base";
import {AddReviewForProduct} from "~/scripts/request-models/add-review-for-product";
import Review from "~/scripts/data/review";
import Authentication from "~/scripts/http/authentication";

export class ProductRequestGroup extends RequestsBase {
    constructor(authentication: Authentication) {
        super("product", authentication);
    }

    async getProduct(productId: number, onSuccess: (x: Product) => any) {
        return await this.httpClient.get(`/${productId}`, onSuccess)
    }

    async createReview(request: AddReviewForProduct, onSuccess: (x: Review) => any) {
        return await this.httpClient.post("/review", request, onSuccess);
    }
}