import EntityBase from "~/scripts/data/entity-base";
import Product from "~/scripts/data/product";

export interface CartItem extends EntityBase {
    userId: number,
    product: Product,
    count: number
}