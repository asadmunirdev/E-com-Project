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
  totalPrice: number | undefined; // Stores the total price of the cart items
  cartData: cart[] | undefined; // Holds the data of items in the cart
  orderMessage: string | undefined; // Holds the message after placing an order
  selectedPaymentMethod: string = ''; // Stores the selected payment method

  constructor(private product: ProductService, private route: Router) {}

  // Lifecycle hook that runs after component initialization
  ngOnInit(): void {
    this.getCartData(); // Fetches the cart data
  }

  // Fetches the cart data from the service and calculates the total price
  getCartData() {
    this.product.currentCart().subscribe((result) => {
      let price = 0; // Variable to store the total price of items
      this.cartData = result; // Assign the fetched cart data
      console.log(this.cartData); // Log the cart data for debugging

      // Loop through each cart item to calculate the total price
      result.forEach((item) => {
        if (item.quantity) {
          price += +item.price * +item.quantity; // Calculate total based on quantity and price
        }
      });

      // Calculate tax, delivery charges, and discount
      let tax = price / 5;
      let delivery = 100;
      let discount = price / 10;
      let total = price + tax + delivery - discount;

      // Ensure totalPrice has only 2 decimal places
      this.totalPrice = parseFloat(total.toFixed(2)); // Store the total price with 2 decimal precision
    });
  }

  // Function triggered when the user confirms the order
  orderNow(data: { email: string; address: string; contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
  
    // Extract product names from cartData
    const productNames = this.cartData?.map((item) => item.name) || [];
  
    // Proceed if total price and payment method are available
    if (this.totalPrice && this.selectedPaymentMethod) {
      let orderData: order = {
        ...data, // User email, address, contact
        totalPrice: this.totalPrice, // Total price
        userId, // User ID from local storage
        paymentMethod: this.selectedPaymentMethod, // Payment method
        products: productNames, // Add product names to order data
        id: undefined, // Set order ID to undefined
      };
  
      // Loop through cart items and remove them after order placement
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id); // Delete cart items
        }, 700); // Delay for smooth deletion
      });
  
      // Send the order data to the backend
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMessage = 'Your Order has been placed successfully';
          setTimeout(() => {
            this.route.navigate(['my-orders']); // Navigate to "My Orders" page
            this.orderMessage = undefined; // Clear the success message
          }, 4000);
        }
      });
    }
  }
  
  // Handles the change of payment method
  onPaymentMethodChange(method: string) {
    this.selectedPaymentMethod = method; // Set the selected payment method
  }
}
