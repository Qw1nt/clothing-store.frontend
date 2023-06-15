export interface AddProductRequest {
    categoriesIds: number[];
    name: string;
    description?: string;
    price: number;
    color: string;
}