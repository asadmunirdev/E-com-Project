// cart-page.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../data-type';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, PkrCurrencyPipe, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  isMobile: boolean = false;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.currebCart().subscribe((result) => {
      this.cartData = result;
    });
    this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768; // Adjust this threshold as needed
  }
}
