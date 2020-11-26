export interface AddProduct {
    id: number;
    nombrearticulo: string;
    imagen: string;
    valorventa: number;
    descripcion: string;
    cant: number;
    idststore: number;
    razonsocial: string;
    valormin?: number;
    valordomicilio?: number;
}
