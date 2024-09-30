// Importing necessary modules and dependencies
import { HttpClient } from '@angular/common/http'; // For making HTTP requests
import { EventEmitter, Injectable } from '@angular/core'; // For creating injectable services and event emitters
import { Router } from '@angular/router'; // For navigation
import { login, signUp } from '../data-type'; // Importing data types for user login and signup
import { BehaviorSubject } from 'rxjs'; // Importing BehaviorSubject for reactive programming

@Injectable({
  providedIn: 'root', // Makes this service available throughout the application
})
export class UserService {
  //* Event emitter to handle login errors
  isLoginError = new EventEmitter<boolean>(false); // Emits a boolean value indicating if there is a login error

  // Constructor to inject HttpClient and Router services
  constructor(private http: HttpClient, private router: Router) {}

  // Method for user signup
  userSignUp(data: signUp) {
    this.http
      .post('http://localhost:3000/users', data, { observe: 'response' }) // Sends a POST request to create a new user
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body)); // Store user data in localStorage
          this.router.navigate(['/']); // Navigate to the home page after successful signup
        }
      });
  }

  // Method for user login
  userLogin(data: login) {
    this.http
      .get<signUp[]>( // Sends a GET request to verify user credentials
        `http://localhost:3000/users?email=${data.email}&password=${data.password} `,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length === 1) { // Check if user exists
          console.log(result); // Log the result for debugging

          localStorage.setItem('user', JSON.stringify(result.body[0])); // Store user data in localStorage
          this.router.navigate(['/']); // Navigate to the home page after successful login
          this.isLoginError.emit(false); // Emit false to indicate no login error
        } else {
          // If login fails
          console.log('Login Failed'); // Log login failure
          this.isLoginError.emit(true); // Emit true to indicate a login error
        }
      });
  }

  // Method to check if user is already authenticated
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']); // Navigate to the home page if user is already logged in
    }
  }
}
