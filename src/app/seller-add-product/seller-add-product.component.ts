// Importing necessary modules and dependencies
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product', // Selector for the component
  standalone: true, // This component is standalone
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule for reactive forms
  templateUrl: './seller-add-product.component.html', // Template URL for the HTML view
  styleUrls: ['./seller-add-product.component.css'] // Stylesheet for this component
})
export class SellerAddProductComponent {
  addProductForm: FormGroup; // FormGroup to manage the product addition form
  addProductMessage: string | undefined; // Variable to store success messages after product addition

  // Injecting FormBuilder and ProductService through the constructor
  constructor(private fb: FormBuilder, private product: ProductService) {
    // Initializing the form with controls and validators
    this.addProductForm = this.fb.group({
      name: ['', Validators.required], // Product name is required
      price: ['', Validators.required], // Product price is required
      color: ['', Validators.required], // Product color is required
      category: ['', Validators.required], // Product category is required
      image: ['', Validators.required], // Product image is required
      description: ['', Validators.required] // Product description is required
    });
  }

  // Method to handle form submission
  submit() {
    if (this.addProductForm.valid) { // Check if the form is valid
      const formData: product = this.addProductForm.value; // Get form data
      // Call the addProduct method from ProductService
      this.product.addProduct(formData).subscribe((result) => {
        if (result) {
          this.addProductMessage = "Product is added successfully"; // Set success message
          this.addProductForm.reset(); // Reset form after successful submission
        }
        // Clear the success message after 3 seconds
        setTimeout(() => this.addProductMessage = undefined, 3000);
      });
    }
  }
}
