// Importing necessary modules and dependencies
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';

@Component({
  selector: 'app-product-details', // Selector for the component
  standalone: true, // This component is standalone
  imports: [CommonModule, PkrCurrencyPipe], // Modules that this component uses
  templateUrl: './product-details.component.html', // Template URL for the HTML view
  styleUrls: ['./product-details.component.css'], // Stylesheet for this component
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product; // Variable to store product data
  productQuantity: number = 1; // Variable to store product quantity
  removeCart = false; // Flag to determine if the product is in the cart
  cartData: product | undefined; // Variable to store cart data
  hasPurchased: boolean = false; // Flag to check if the product has been purchased before

  // Injecting ActivatedRoute and ProductService through the constructor
  constructor(
    private activateRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  // Lifecycle hook that runs when the component initializes
  ngOnInit() {
    // Get productId from the route parameters
    this.activateRoute.paramMap.subscribe((param) => {
      const productId = param.get('productId');
      if (productId) {
        this.product.getProduct(productId).subscribe((result) => {
          this.productData = result; // Assign fetched product data to productData
          this.checkIfProductInCart(productId); // Check cart for the product
          this.checkIfPurchased(productId); // Check if the product has been purchased
        });
      }
    });
  }

  // Method to check if the product is in the cart
  checkIfProductInCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items = JSON.parse(cartData);
      items = items.filter(
        (item: product) => item.id && productId === item.id.toString()
      );
      this.removeCart = items.length > 0;
    }
  }

  // Method to check if the product has been purchased before
  checkIfPurchased(productId: string) {
    // Implement your logic to check if the product has been purchased
    // For example, you can check against a list of purchased products in local storage
    let purchasedProducts = JSON.parse(
      localStorage.getItem('purchasedProducts') || '[]'
    );
    this.hasPurchased = purchasedProducts.includes(productId);
  }

  // Method to handle product quantity adjustments
  handleQuality(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1; // Increase quantity if less than 20
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1; // Decrease quantity if greater than 1
    }
  }

  // Method to handle the "Buy Now" button click
  BuyNow() {
    if (this.hasPurchased) {
      // Logic to handle buying again (if applicable)
      console.log('Buying again');
    } else {
      // Logic for a first-time purchase
      console.log('Buying product');
    }
  }

  // Method to add the product to the cart
  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity; // Set the quantity of the product
      // Check if the user is logged in
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData); // Add product to local cart
        this.removeCart = true; // Update removeCart flag
      } else {
        let user = localStorage.getItem('user'); // Get user data from local storage
        let userId = user && JSON.parse(user).id; // Extract user ID
        // Prepare cart data to send to the server
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id; // Remove local cart ID before sending to the server
        // Add product to remote cart
        this.product.addtoCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId); // Fetch updated cart list
            this.removeCart = true; // Update removeCart flag
          }
        });
      }
    }
  }

  // Method to remove the product from the cart
  RemoveFromCart(productId: number) {
    // Check if the user is logged in
    if (!localStorage.getItem('user')) {
      this.product.removeItemsFromCart(productId); // Remove product from local cart
      this.removeCart = false; // Update removeCart flag
    } else {
      let user = localStorage.getItem('user'); // Get user data from local storage
      let userId = user && JSON.parse(user).id; // Extract user ID
      // Remove product from remote cart
      this.cartData &&
        this.product.removeToCart(this.cartData.id).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId); // Fetch updated cart list
          }
        });
      this.removeCart = false; // Update removeCart flag
    }
  }
}
