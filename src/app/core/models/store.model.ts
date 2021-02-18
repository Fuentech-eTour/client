import { AddProduct } from './addProduct.model';

export interface Store {
    id: number;
    razonsocial: string;
    products: AddProduct[];
    imagen?: string;
    total: number;
    valormin?: number;
    valordomicilio?: number;
}

export interface Days {
    id: number;
    name: string;
    initials: string;
}

export interface CreateStore {
    tipodoc: string;
    identificacion: string;
    digito: number;
    razonsocial: string;
    tipo: string;
    idutmunicipality: number;
    direccion: string;
    email: string;
    telefono: string;
    regimen: string;
    zona: string;
    digitoclave: string;
    imagen: string;
}