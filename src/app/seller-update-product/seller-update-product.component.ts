// Importing necessary modules and dependencies
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product, category } from '../data-type';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-seller-update-product', // Selector for the component
  standalone: true, // This component is standalone
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule and CommonModule
  templateUrl: './seller-update-product.component.html', // Template URL for the HTML view
  styleUrls: ['./seller-update-product.component.css'], // Stylesheet for this component
})
export class SellerUpdateProductComponent implements OnInit {
  updateProductForm: FormGroup; // FormGroup to manage the product update form
  productMessage: string | undefined; // Variable to store success messages after product update
  categories: category[] = []; // Array to hold categories
  productData: product | undefined; // Variable to store fetched product data

  // Injecting FormBuilder, ProductService, ActivatedRoute, and Router through the constructor
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    // Initializing the form with controls and validators
    this.updateProductForm = this.fb.group({
      name: ['', Validators.required], // Product name is required
      price: ['', Validators.required], // Product price is required
      color: ['', Validators.required], // Product color is required
      category: ['', Validators.required], // Product category is required
      image: ['', Validators.required], // Product image is required
      description: ['', Validators.required], // Product description is required
    });
  }

  // Lifecycle hook that runs when the component initializes
  ngOnInit(): void {
    // Get productId from the route parameters
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe((data) => {
        this.productData = data; // Assign fetched product data to productData
        this.updateProductForm.patchValue(data); // Populate the form with existing product data
      });
    }

    // Fetch categories from the API
    this.productService.getCategories().subscribe((data: category[]) => {
      this.categories = data; // Populate categories from the service
    });
  }

  // Method to handle form submission for updating the product
  submit() {
    if (this.updateProductForm.valid && this.productData) {
      // Check if the form is valid
      const formData: product = {
        ...this.updateProductForm.value,
        id: this.productData.id,
      }; // Get form data and set the product ID

      // Call the updateProduct method from ProductService
      this.productService.updateProduct(formData).subscribe((result) => {
        if (result) {
          this.productMessage = 'Product has been updated successfully'; // Set success message

          // Show success toast for product update
          this.toastService.showToast(this.productMessage, 'success');

          // Clear the success message after 3 seconds
          setTimeout(() => {
            this.productMessage = undefined;
          }, 3000);

          this.router.navigate(['seller-home']); // Navigate back to seller home after update
        }
      });
    }
  }
}
