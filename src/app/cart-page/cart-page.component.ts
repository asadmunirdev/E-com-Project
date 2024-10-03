// cart-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../data-type';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, PkrCurrencyPipe, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.currebCart().subscribe((result) => {
      this.cartData = result;
    });
  }
}
