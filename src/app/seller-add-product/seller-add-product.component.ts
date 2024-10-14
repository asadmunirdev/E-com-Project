// Importing necessary modules and dependencies
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product, category } from '../data-type';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-seller-add-product', // Selector for the component
  standalone: true, // This component is standalone
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule and CommonModule
  templateUrl: './seller-add-product.component.html', // Template URL for the HTML view
  styleUrls: ['./seller-add-product.component.css'] // Stylesheet for this component
})
export class SellerAddProductComponent implements OnInit {
  addProductForm: FormGroup; // FormGroup to manage the product addition form
  addProductMessage: string | undefined; // Variable to store success messages after product addition
  categories: category[] = []; // Array to hold categories

  // Injecting FormBuilder and ProductService through the constructor
  constructor(private fb: FormBuilder, private product: ProductService,
    private toastService: ToastService
  ) {
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

  // Lifecycle hook to fetch categories when the component initializes
  ngOnInit() {
    this.product.getCategories().subscribe((data: category[]) => {
      this.categories = data; // Populate categories from the service
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

        // Show success toast for product addition
        this.toastService.showToast(this.addProductMessage, 'success');

        // Clear the success message after 3 seconds
        setTimeout(() => this.addProductMessage = undefined, 3000);
      }
    });
  }
}
}
