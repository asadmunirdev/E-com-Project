import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { cart, product, signUp, login } from '../data-type'; // Ensure login is imported here
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth', // Selector for the component
  standalone: true, // This component is standalone
  imports: [FormsModule, CommonModule], // Modules that this component uses
  templateUrl: './user-auth.component.html', // Template URL for the HTML view
  styleUrls: ['./user-auth.component.css'], // Stylesheet for this component
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true; // Variable to toggle between login and signup forms
  authError: string = ''; // Variable to store authentication error messages

  // Injecting UserService and ProductService through the constructor
  constructor(private user: UserService, private product: ProductService) {}

  // Lifecycle hook that runs when the component initializes
  ngOnInit(): void {
    this.user.userAuthReload(); // Reloads user authentication status
  }

  // Method to open the login form
  openLogin(): void {
    this.showLogin = true;
  }

  // Method to open the signup form
  openSignUp(): void {
    this.showLogin = false;
  }

  // Method to handle user signup
  signUp(form: NgForm): void {
    if (form.valid) {
      const data: signUp = form.value;
      this.user.userSignUp(data); // Calling user signup method
      this.user.isLoginError.subscribe((isError) => {
        if (!isError) {
          this.localCartToRemoteCart(); // Transfer local cart to remote cart after successful signup
        }
      });
    } else {
      console.log('Sign Up Form is invalid');
    }
  }

  // Method to handle user login
  login(form: NgForm): void {
    if (form.valid) {
      const data: login = form.value; // Use the correct type here
      this.user.userLogin(data); // Calling user login method
      this.user.isLoginError.subscribe((isError) => {
        if (isError) {
          this.authError = 'Please enter valid user details';
        } else {
          this.localCartToRemoteCart(); // Transfer local cart to remote cart after successful login
        }
      });
    } else {
      console.log('Login Form is invalid');
    }
  }

  // Method to transfer local cart items to remote cart
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id; // Get the user ID from localStorage

    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id; // Removing local cart id since it's no longer needed

        // Adding product to remote cart
        this.product.addtoCart(cartData).subscribe((result) => {
          if (result) {
            console.log('Item stored in DB');
          }
        });

        // Clear local cart after all items have been added to the remote cart
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }

    // Fetching the updated cart list from the server
    if (userId) {
      setTimeout(() => {
        this.product.getCartList(userId);
      }, 500);
    }
  }
}
