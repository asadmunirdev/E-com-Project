import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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
  serachProducts(query:string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }
}
