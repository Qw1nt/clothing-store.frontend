import Product from "~/scripts/data/product";
import RequestsBase from "~/scripts/requests-groups/requests-base";

export default class CatalogRequestGroup extends RequestsBase {
    constructor() {
        super("catalog");
    }

    public async getAll(onSuccess: (x: Product[]) => any) {
        return await this.httpClient.get<Product[]>("", onSuccess);
    }

    public async getNew(count: number, onSuccess: (result: Product[]) => any) {
        return await this.httpClient.get<Product[]>(`/top-new/${count}`, onSuccess);
    }

    public async getBestsellers(onSuccess: (x: Product[]) => any) {
        return await this.httpClient.get<Product[]>("/bestsellers", onSuccess);
    }

    public async getByCategory(categoryId: number, onSuccess: (x: Product[]) => any) {
        return await this.httpClient.get<Product[]>(`/category/${categoryId}`, onSuccess);
    }
}