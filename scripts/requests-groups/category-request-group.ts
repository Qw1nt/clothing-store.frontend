import Category from "~/scripts/data/category";
import RequestsBase from "~/scripts/requests-groups/requests-base";

export class CategoryRequestGroup extends RequestsBase {
    constructor() {
        super("category");
    }

    async getAll(onSuccess: (x: Category[]) => any){
        return await this.httpClient.get("", onSuccess);
    }
}