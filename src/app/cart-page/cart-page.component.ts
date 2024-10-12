import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';
import { Router, RouterModule } from '@angular/router';
import { EmptyStateComponent } from '../empty-state/empty-state.component'; // Import your EmptyStateComponent
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, PkrCurrencyPipe, RouterModule, EmptyStateComponent, FormsModule], // Add EmptyStateComponent here
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] = []; // Initialize as an empty array
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private product: ProductService, private router: Router) {}

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
      if (item.quantity) {
        price += +item.price * +item.quantity;
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
  increaseQuantity(cart: cart) {
    const currentQuantity = cart.quantity || 0; // Default to 0 if undefined
    if (currentQuantity < 20) { // Restrict quantity to a maximum of 20
      cart.quantity = currentQuantity + 1; // Increase quantity
      this.updateCart(cart); // Update cart
    }
  }

  decreaseQuantity(cart: cart) {
    const currentQuantity = cart.quantity || 0; // Default to 0 if undefined
    if (currentQuantity > 1) {
      cart.quantity = currentQuantity - 1; // Decrease quantity
      this.updateCart(cart); // Update cart
    }
  }
  // Method to update the cart item quantity in the server
  updateCart(cart: cart) {
    this.product.updateCartItemQuantity(cart).subscribe(() => {
      this.calculatePriceSummary(); // Recalculate price summary
    });
  }

  // removeCart(cartId: number | undefined) {
  //   cartId &&
  //     this.cartData &&
  //     this.product.removeToCart(cartId).subscribe(() => {
  //       this.getCartData();
  //     });
  // }

  removeCart(itemId: number) {
    if (localStorage.getItem('user')) {
      const user = localStorage.getItem('user');
      const userId = user && JSON.parse(user).id;

      // Call the service method with the correct item ID
      this.product.removeToCart(itemId).subscribe((result) => {
        if (result) {
          console.log(result);
          this.getCartData(); // Refresh cart data
          this.product.getCartList(userId); // Optionally refresh cart list
        }
      });
    }
  }


  checkout() {
    this.router.navigate(['checkout']);
  }
}
