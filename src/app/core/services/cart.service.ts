import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';
import { AddProduct } from '../models/addProduct.model';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private orderLists: Store[] = [];
  private storeList: Store;
  private idStore: number[] = [];
  private idStoreState: boolean;
  private priceTotalStore: number;
  private products: AddProduct[] = [];
  private idProduct: number[] = [];
  private precio = 0;
  private contProduct = 0;
  private newProduct: AddProduct;
  private sideBarOpen = false;
  private sideBarOpenIzq = false;

  private openSideBar = new BehaviorSubject<boolean>(false);
  private openSideBarIzq = new BehaviorSubject<boolean>(false);
  private precioTotal = new BehaviorSubject<number>(0);
  private numProductsCart = new BehaviorSubject<number[]>([]);
  private card = new BehaviorSubject<AddProduct[]>([]);
  private order = new BehaviorSubject<Store[]>([]);

  openSideBar$ = this.openSideBar.asObservable();
  openSideBarIzq$ = this.openSideBarIzq.asObservable();
  cart$ = this.card.asObservable();
  order$ = this.order.asObservable();
  precioTotal$ = this.precioTotal.asObservable();
  numProductsCart$ = this.numProductsCart.asObservable();

  constructor() { }

  sideBarToggler() {
    if (this.sideBarOpenIzq === true) {
      this.sideBarOpenIzq = false;
      this.openSideBarIzq.next(this.sideBarOpenIzq);
    }
    this.sideBarOpen = !this.sideBarOpen;
    this.openSideBar.next(this.sideBarOpen);
  }

  sideBarTogglerIzq() {
    if (this.sideBarOpen === true) {
      this.sideBarOpen = false;
      this.openSideBar.next(this.sideBarOpen);
    }
    this.sideBarOpenIzq = !this.sideBarOpenIzq;
    this.openSideBarIzq.next(this.sideBarOpenIzq);
  }

  addCart(product: Product) {

    this.contId(product.id);

    this.newProduct = {
      id: product.id,
      nombrearticulo: product.nombrearticulo,
      imagen: product.imagen,
      valorventa: product.valorventa,
      descripcion: product.descripcion,
      idststore: product.idststore,
      razonsocial: product.razonsocial,
      cant: this.contProduct,
    };

    // adiciona producto a la lista de productos y si existe aumenta la cantidad de ese producto
    if (this.contProduct <= 1) {
      this.products = [...this.products, this.newProduct];
      this.card.next(this.products);
    } else {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === product.id) {
          this.products[i].cant = this.contProduct;
        }
      }
    }

    this.verifyExistStore(product.idststore);

    if (!this.idStoreState) {
      this.storeList = {
        id: product.idststore,
        razonsocial: product.razonsocial,
        products: [this.newProduct],
        total: product.valorventa,
        imagen: product.imagent,
      };
      this.orderLists = [...this.orderLists, this.storeList];
    } else {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.orderLists.length; i++) {
        if (this.orderLists[i].id === product.idststore) {
          this.orderLists[i].total += product.valorventa;
          if (this.contProduct <= 1) {
            this.orderLists[i].products = [...this.orderLists[i].products, this.newProduct];
            break;
          } else {
            // tslint:disable-next-line: prefer-for-of
            for (let j = 0; j < this.orderLists[i].products.length; j++) {
              if (this.orderLists[i].products[j].id === product.id) {
                this.orderLists[i].products[j].cant = this.contProduct;
                break;
              }
            }
          }
        }
      }
    }
    this.order.next(this.orderLists);
  }

  removeCart(product: Product) {

    this.contIdRemove(product.id);

    // asigna la cantidad al objeto producto
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === product.id) {
        this.products[i].cant = this.contProduct;
      }
    }

    // remueve de la lista de productos el objeto cuya cantidad sea cero
    if (this.contProduct === 0) {
      let i: number;
      let x: number;
      // tslint:disable-next-line: prefer-for-of
      for (let n = 0; n < this.products.length; n++) {
        if (this.products[n].id === product.id) {
          i = n;
          break;
        }
      }
      this.products.splice(i, 1);

      // remueve productos de la orderLists
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.orderLists.length; j++) {
        if (this.orderLists[j].id === product.idststore) {
          // tslint:disable-next-line: prefer-for-of
          for (let k = 0; k < this.orderLists[j].products.length; k++) {
            if (this.orderLists[j].products[k].id === product.id) {
              x = k;
              this.orderLists[j].products.splice(x, 1);
              break;
            }
          }
          break;
        }
      }

    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.orderLists.length; i++) {
      if (this.orderLists[i].id === product.idststore) {
        this.orderLists[i].total -= product.valorventa;
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < this.orderLists[i].products.length; j++) {
          if (this.orderLists[i].products[j].id === product.id) {
            this.orderLists[i].products[j].cant = this.contProduct;
            break;
          }
        }
        if (this.orderLists[i].products.length === 0) {
          this.orderLists.splice(i, 1);
          for (let y = 0; y < this.idStore.length; y++) {
            if (this.idStore[y] === product.idststore) {
              this.idStore.splice(y, 1);
            }
          }
        }
        break;
      }
    }
    this.card.next(this.products);
    this.order.next(this.orderLists);
  }

  // Metodo para sumar precio del producto al cart
  addPrice(price: number) {
    this.precio += price;
    this.precioTotal.next(this.precio);
  }

  // Metodo para restar precio del producto al cart
  removePrice(price: number) {
    this.precio -= price;
    this.precioTotal.next(this.precio);
  }

  // Verifica si ya se han agregado productos de una respectiva tienda
  verifyExistStore(id: number) {
    this.idStoreState = false;
    for (const idStore of this.idStore) {
      if (idStore === id) {
        this.idStoreState = true;
        break;
      }
    }

    if (!this.idStoreState) {
      this.idStore = [...this.idStore, id];
    }
  }

  // Metodo para adicionar Id y contar cuantos Id hay de cada producto
  contId(id: number) {
    this.idProduct = [...this.idProduct, id];
    this.contProduct = 0;

    for (const idPro of this.idProduct) {
      if (idPro === id) {
        this.contProduct += 1;
      }
    }
    this.numProductsCart.next(this.idProduct);
  }

  // Metodo para remover Id y contar cuantos Id hay de cada producto
  contIdRemove(id: number) {
    // tslint:disable-next-line: prefer-const
    let i: number;
    // tslint:disable-next-line: prefer-for-of
    for (let n = 0; n < this.idProduct.length; n++) {
      if (this.idProduct[n] === id) {
        i = n;
        break;
      }
    }
    this.idProduct.splice(i, 1);
    this.contProduct = 0;

    for (const idProduct of this.idProduct) {
      if (idProduct === id) {
        this.contProduct += 1;
      }
    }
    this.numProductsCart.next(this.idProduct);
  }
}
