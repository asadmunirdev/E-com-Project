import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signUp, login } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  //* Observable to track if the seller is logged in or not
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  //* Event emitter to handle login errors
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  //! Method to handle user sign-up
  userSignUp(data: signUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' }) // HTTP POST request to the server
      .subscribe((result) => {
        console.log(result); // Logging the server response
        if (result) {
          // If the response is successful
          localStorage.setItem('seller', JSON.stringify(result.body)); // Store seller data in local storage
          console.log(result.body);
          
          this.router.navigate(['seller-home']); // Navigate to the seller home page
        }
      });
  }

  //! Method to check if a seller is already logged in
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      // Check if seller data is stored in local storage
      this.isSellerLoggedIn.next(true); // Update the login state to true
      this.router.navigate(['seller-home']); // Navigate to the seller home page
    }
  }

  //! Method to handle user login
  userLogin(data: login) {
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`, // HTTP GET request with email and password
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length === 1) {
          // If login is successful
          localStorage.setItem('seller', JSON.stringify(result.body)); // Store seller data in local storage
          this.router.navigate(['seller-home']); // Navigate to the seller home page
          this.isLoginError.emit(false); // Emit false to indicate no login error
        } else {
          // If login fails
          console.log('Login Failed'); // Log login failure
          this.isLoginError.emit(true); // Emit true to indicate a login error
        }
      });
  }
}
