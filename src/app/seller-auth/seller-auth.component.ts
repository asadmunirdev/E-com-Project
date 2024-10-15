// Importing necessary modules and dependencies
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { signUp } from '../data-type';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

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
  securityError: string = ''; // Variable to store security key error
  private securityKey: string = 'pass1122'; // Security key for signup

  // Injecting SellerService through the constructor
  constructor(
    private seller: SellerService,
    private toastService: ToastService
  ) {}

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
      const enteredSecurityKey = form.value.securityKey;

      // Validate the security key
      if (enteredSecurityKey === this.securityKey) {
        console.log('Security key matched, proceeding with signup');
        this.securityError = ''; // Clear any previous security errors

        // Call the signup method from SellerService
        this.seller.userSignUp(data);

        // Show success toast using ToastService
        this.toastService.showToast('Seller sign up successful!', 'success');
      } else {
        this.securityError = 'Invalid security key, please try again'; // Set an error message if the key doesn't match
        console.log('Invalid security key');

        // Show error toast using ToastService
        this.toastService.showToast(this.securityError, 'error');
      }
    } else {
      // Show invalid form toast using ToastService
      this.toastService.showToast('Sign Up Form is invalid.', 'error');
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
          this.authError = 'Email or password is not correct'; // Display error message if login fails

          // Show error toast using ToastService
          this.toastService.showToast(this.authError, 'error');
        } else {
          // Show success toast for successful login using ToastService
          this.toastService.showToast('Seller login successful!', 'success');
        }
      });
    } else {
      // Show invalid form toast using ToastService
      this.toastService.showToast('Login Form is invalid.', 'error');
      console.log('Form is invalid'); // Log an error message if the form is invalid
    }
  }
}
