import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMessage: string | undefined;
  constructor(private product: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData() {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      console.log(this.cartData);

      result.forEach((item) => {
        if (item.quantity) {
          price += +item.price * +item.quantity;
        }
      });
      this.totalPrice = price + price / 5 + 100 - price / 10;
      //  console.log(this.totalPrice);
    });
  }

  orderNow(data: { email: string; address: string; contact: string }) {
    // console.log(data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 700);
      });

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMessage = 'Your Order has been placed successfully';
          setTimeout(() => {
            this.route.navigate(['my-orders']);
            this.orderMessage = undefined;
          }, 4000);
        }
      });
    }
  }

  // Variable to store the selected payment method
  selectedPaymentMethod: string = '';
  // Method to handle payment method change
  onPaymentMethodChange(method: string) {
    this.selectedPaymentMethod = method;
  }
}
