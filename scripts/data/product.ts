import EntityBase from "~/scripts/data/entity-base";
import Category from "~/scripts/data/category";
import Review from "~/scripts/data/review";

export default interface Product extends EntityBase {
    categories: Category[];
    name: string;
    description?: string;
    price: number,
    purchasedCount: number,
    color?: string;
    imageUrl?: string;
    reviews?: Review[];
}