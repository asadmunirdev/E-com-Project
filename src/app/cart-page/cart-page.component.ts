import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';
import { Router, RouterModule } from '@angular/router';
import { EmptyStateComponent } from '../empty-state/empty-state.component'; // Import your EmptyStateComponent
import { FormsModule } from '@angular/forms';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    PkrCurrencyPipe,
    RouterModule,
    EmptyStateComponent,
    FormsModule,
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] = [];
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  allSelected: boolean = false; // To track Select All checkbox

  constructor(
    private product: ProductService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      this.calculatePriceSummary();
    });
  }

  calculatePriceSummary() {
    let price = 0;
    this.cartData.forEach((item) => {
      if (item.selected) {
        price += (item.price || 0) * (item.quantity || 1);
      }
    });
    this.priceSummary.price = price;
    this.priceSummary.discount = price / 10;
    this.priceSummary.tax = price / 5;
    this.priceSummary.delivery = 100;
    this.priceSummary.total =
      price +
      this.priceSummary.tax +
      this.priceSummary.delivery -
      this.priceSummary.discount;
  }

  toggleSelectAll() {
    this.cartData.forEach((cart) => (cart.selected = this.allSelected));
    this.calculatePriceSummary(); // Recalculate the summary
  }

  isAnyItemSelected(): boolean {
    return this.cartData.some(cart => cart.selected);
  }
  

  updateSelectedItems() {
    this.allSelected = this.cartData.every(cart => cart.selected);
    this.calculatePriceSummary(); // Recalculate the summary
  }

  increaseQuantity(cart: cart) {
    const currentQuantity = cart.quantity || 0;
    if (currentQuantity < 20) {
      cart.quantity = currentQuantity + 1;
      this.updateCart(cart);
    }
  }

  decreaseQuantity(cart: cart) {
    const currentQuantity = cart.quantity || 0;
    if (currentQuantity > 1) {
      cart.quantity = currentQuantity - 1;
      this.updateCart(cart);
    }
  }

  updateCart(cart: cart) {
    this.product.updateCartItemQuantity(cart).subscribe(() => {
      this.calculatePriceSummary();
    });
  }

  removeCart(itemId: number) {
    if (localStorage.getItem('user')) {
      const user = localStorage.getItem('user');
      const userId = user && JSON.parse(user).id;

      this.product.removeToCart(itemId).subscribe((result) => {
        if (result) {
          this.getCartData();
          this.product.getCartList(userId);
          this.toastService.showToast(
            'Item removed from cart successfully!',
            'success'
          );
        }
      });
    }
  }

  checkout() {
    const selectedProductIds = this.cartData
      .filter(item => item.selected)
      .map(item => item.productId)
      .join(',');

    this.router.navigate(['checkout'], { queryParams: { productIds: selectedProductIds } });
  }
}
