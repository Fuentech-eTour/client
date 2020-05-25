import { AddProduct } from './addProduct.model';

export interface Store {
    id: number;
    name: string;
    products: AddProduct[];
    total: number;
}
