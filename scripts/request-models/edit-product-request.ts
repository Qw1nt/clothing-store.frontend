import Category from "~/scripts/data/category";

export interface EditProductRequest {
    name?: string;
    description?: string;
    price?: number;
    color?: string;
    categories?: Category[];
}