import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient, private router: Router) {}

  //! Adding Product API Service
  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }
  //! Showing Product API Service
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  //! Deleting Product API Service
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  //! Prefill Product API Service
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  //! Update Product API Service
  updateProduct(product: product) {
    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  //! Products in Carousal
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=5');
  }
  //! Products in Cards
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  //! Products in Searchbar
  serachProducts(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }
  //! Add Product to Cart by Local Storage
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  //! Remove Product from Cart by Local Storage
  removeItemsFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((items: product) => productId !== items.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  //! Add to Cart with User Logged In
  addtoCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart', cartData);
  }

}
