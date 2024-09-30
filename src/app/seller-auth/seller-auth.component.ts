// Importing necessary modules and dependencies
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { signUp } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth', // Selector for the component
  standalone: true, // This component is standalone
  imports: [FormsModule, CommonModule], // Modules that this component uses
  templateUrl: './seller-auth.component.html', // Template URL for the HTML view
  styleUrls: ['./seller-auth.component.css'], // Stylesheet for this component
})
export class SellerAuthComponent implements OnInit {
  showLogin = true; // Variable to toggle between login and signup forms
  authError: string = ''; // Variable to store authentication error messages

  // Injecting SellerService through the constructor
  constructor(private seller: SellerService) {}

  // Lifecycle hook that runs when the component initializes
  ngOnInit(): void {
    this.seller.reloadSeller(); // Reloads seller authentication status
  }

  // Method to open the login form
  openLogin(): void {
    this.showLogin = true;
  }

  // Method to open the signup form
  openSignUp(): void {
    this.showLogin = false;
  }

  // Method to handle seller signup
  signUp(form: NgForm): void {
    if (form.valid) {
      const data: signUp = form.value;
      console.log(data); // Log the signup data for debugging
      this.seller.userSignUp(data); // Call the signup method from SellerService
    } else {
      console.log('Form is invalid'); // Log an error message if the form is invalid
    }
  }

  // Method to handle seller login
  login(form: NgForm): void {
    if (form.valid) {
      const data: signUp = form.value;
      this.seller.userLogin(data); // Call the login method from SellerService
      this.seller.isLoginError.subscribe((isError) => {
        if (isError) {
          this.authError = 'email or password is not correct'; // Display error message if login fails
        }
      });
    } else {
      console.log('Form is invalid'); // Log an error message if the form is invalid
    }
  }
}
