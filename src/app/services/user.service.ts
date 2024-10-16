// Importing necessary modules and dependencies
import { HttpClient } from '@angular/common/http'; // For making HTTP requests
import { EventEmitter, Injectable } from '@angular/core'; // For creating injectable services and event emitters
import { Router } from '@angular/router'; // For navigation
import { login, signUp } from '../data-type'; // Importing data types for user login and signup
import { BehaviorSubject, Subject } from 'rxjs'; // Importing BehaviorSubject for reactive programming
import { ProductService } from './product.service'; // Import ProductService to access cart methods

@Injectable({
  providedIn: 'root', // Makes this service available throughout the application
})
export class UserService {
  //* Event emitter to handle login errors
  isLoginError = new EventEmitter<boolean>(false); // Emits a boolean value indicating if there is a login error
  isSignUpSuccess = new Subject<boolean>();

  // Define API endpoints as constants
  private readonly API_URL = 'http://localhost:3000';
  private readonly USERS_ENDPOINT = `${this.API_URL}/users`;

  // Constructor to inject HttpClient, Router, and ProductService
  constructor(private http: HttpClient, private router: Router, private productService: ProductService) {}

  // Method for user signup
  userSignUp(data: signUp) {
    this.http
      .post(this.USERS_ENDPOINT, data, { observe: 'response' })
      .subscribe(
        (result) => {
          if (result) {
            localStorage.setItem('user', JSON.stringify(result.body));
            this.router.navigate(['/']);
            this.localCartToRemoteCart();
            this.isSignUpSuccess.next(true); // Emit success
          }
        },
        (error) => {
          console.error('Signup failed', error);
          this.isSignUpSuccess.next(false); // Emit failure
        }
      );
  }

  // Method for user login
  userLogin(data: login) {
    this.http
      .get<signUp[]>(`${this.USERS_ENDPOINT}?email=${data.email}&password=${data.password}`, {
        observe: 'response',
      })
      .subscribe((result: any) => {
        if (result && result.body && result.body.length === 1) { // Check if user exists
          localStorage.setItem('user', JSON.stringify(result.body[0])); // Store user data in localStorage
          this.router.navigate(['/']); // Navigate to the home page after successful login
          this.isLoginError.emit(false); // Emit false to indicate no login error
          this.localCartToRemoteCart(); // Transfer local cart items to remote cart
        } else {
          console.log('Login Failed'); // Log login failure
          this.isLoginError.emit(true); // Emit true to indicate a login error
        }
      });
  }

  // Method to transfer local cart items to remote cart
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id; // Get the user ID from localStorage

    if (data && userId) {
      let cartDataList: any[] = JSON.parse(data); // Replace 'any' with your product interface if necessary

      cartDataList.forEach((product, index) => {
        let cartData = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id; // Removing local cart id since it's no longer needed

        // Adding product to remote cart
        this.productService.addtoCart(cartData).subscribe((result) => {
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
    setTimeout(() => {
      if (userId) {
        this.productService.getCartList(userId);
      }
    }, 500);
  }

  // Method to check if user is already authenticated
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']); // Navigate to the home page if user is already logged in
    }
  }
}
