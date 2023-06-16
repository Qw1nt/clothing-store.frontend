import Product from "~/scripts/data/product";
import RequestsBase from "~/scripts/requests-groups/requests-base";
import {AddReviewForProduct} from "~/scripts/request-models/add-review-for-product";
import Review from "~/scripts/data/review";
import Authentication from "~/scripts/http/authentication";
import {EditProductRequest} from "~/scripts/request-models/edit-product-request";

export class ProductRequestGroup extends RequestsBase {
    constructor(authentication: Authentication) {
        super("product", authentication);
    }

    async getProduct(productId: number, onSuccess: (x: Product) => any) {
        return await this.httpClient.get(`${productId}`, onSuccess)
    }

    async createReview(request: AddReviewForProduct, onSuccess: (x: Review) => any) {
        return await this.httpClient.post("review", request, onSuccess);
    }
    
    async update(productId: number, request: EditProductRequest){
        return await this.httpClient.put(`${productId}`, request);
    }
    
    async updateImage(productId: number, image: File){
        const formData = new FormData();
        formData.append("image", image);
        return await this.httpClient.put(`image/${productId}`, formData);
    }
}