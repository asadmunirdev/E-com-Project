// Importing necessary modules and dependencies
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';
import { ToastService } from '../services/toast.service';

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

  // Injecting ActivatedRoute and ProductService through the constructor
  constructor(
    private activateRoute: ActivatedRoute,
    private product: ProductService,
    private toastService: ToastService,
    private router:Router
  ) {}

  // Lifecycle hook that runs when the component initializes
  ngOnInit() {
   this.fetchData()
  }
  
fetchData(){
 // Get productId from the route parameters
 this.activateRoute.paramMap.subscribe((param) => {
  const productId = param.get('productId');
  if (productId) {
    this.product.getProduct(productId).subscribe((result) => {
      this.productData = result; // Assign fetched product data to productData
      
      // Reset removeCart flag to false for the new product
      this.removeCart = false; 

      // Check local storage for cart data
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        // Filter items in the cart to see if the current product is present
        items = items.filter(
          (item: product) => item.id && productId === item.id.toString()
        );
        // Update removeCart flag based on presence in the cart
        if (items.length) {
          this.removeCart = true;
        }
      }

      // Check for user in local storage to determine if the user is logged in
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id; // Get user ID from local storage
        this.product.getCartList(userId); // Fetch cart list for the user
        this.product.cartData.subscribe((result) => {
          // Check if the current product is in the user's cart
          let item = result.filter(
            (item: product) =>
              productId?.toString() === item.productId?.toString()
          );
          // Update cartData and removeCart flag if the product is found
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          } else {
            // Reset cartData and removeCart if product is not in the cart
            this.cartData = undefined;
            this.removeCart = false;
          }
        });
      } else {
        // If not logged in, ensure removeCart is updated
        this.cartData = undefined;
      }
    });
  }
});
}

  // Method to handle product quantity adjustments
  handleQuality(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1; // Increase quantity if less than 20
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1; // Decrease quantity if greater than 1
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

      // Show success toast for adding to local cart using ToastService
      this.toastService.showToast("Product added to cart!", "success");
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

          // Show success toast for adding to remote cart using ToastService
          this.toastService.showToast("Product added to cart!", "success");
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

    // Show success toast for removing from local cart using ToastService
    this.toastService.showToast("Product removed from cart!", "success");
  } else {
    let user = localStorage.getItem('user'); // Get user data from local storage
    let userId = user && JSON.parse(user).id; // Extract user ID

    // Remove product from remote cart
    this.cartData &&
      this.product.removeToCart(this.cartData.id).subscribe((result) => {
        if (result) {
          this.product.getCartList(userId); // Fetch updated cart list

          // Show success toast for removing from remote cart using ToastService
          this.toastService.showToast("Product removed from cart!", "success");
        }
      });
    this.removeCart = false; // Update removeCart flag
  }
}

// In ProductDetailsComponent
buyNow() {
  const user = localStorage.getItem('user');

  if (user) {
    // If user is logged in, navigate to checkout with productId as a query parameter
    this.router.navigate(['checkout'], { queryParams: { productIds: this.productData?.id } });
  } else {
    // If user is not logged in, show toast notification
    this.toastService.showToast("Please log in to buy products.", "error");
    this.router.navigate(['login-first'])
  }
}


}
