import Product from "~/scripts/data/product";
import RequestsBase from "~/scripts/requests-groups/requests-base";
import Authentication from "~/scripts/http/authentication";

export default class CatalogRequestGroup extends RequestsBase {
    constructor(authentication?: Authentication) {
        super("catalog", authentication);
    }

    public async getAll(onSuccess: (x: Product[]) => any) {
        return await this.httpClient.get<Product[]>("", onSuccess);
    }

    public async getSorted(onSuccess: (x: Product[]) => any) {
        return await this.httpClient.get<Product[]>("/sorted", onSuccess);
    }

    public async getNew(count: number, onSuccess: (result: Product[]) => any) {
        return await this.httpClient.get<Product[]>(`/top-new/${count}`, onSuccess);
    }

    public async getBestsellers(onSuccess: (x: Product[]) => any) {
        return await this.httpClient.get<Product[]>("/bestsellers", onSuccess);
    }

    public async getByCategory(categoryId: number, onSuccess: (x: Product[][]) => any) {
        return await this.httpClient.get<Product[][]>(`category/${categoryId}`, onSuccess);
    }
}