import { AddProduct } from './addProduct.model';

export interface Store {
    id: number;
    razonsocial: string;
    products: AddProduct[];
    total: number;
}
