// Importing necessary modules and dependencies
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product', // Selector for the component
  standalone: true, // This component is standalone
  imports: [FormsModule], // Import FormsModule for reactive forms
  templateUrl: './seller-update-product.component.html', // Template URL for the HTML view
  styleUrl: './seller-update-product.component.css', // Stylesheet for this component
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product; // Variable to store fetched product data
  productMeSSAGE: undefined | string; // Variable to store success messages after product update

  // Injecting ActivatedRoute, ProductService, and Router through the constructor
  constructor(private route: ActivatedRoute, private product: ProductService, private router: Router) {}

  // Lifecycle hook that runs when the component initializes
  ngOnInit(): void {
    // Get productId from the route parameters
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        this.productData = data; // Assign fetched product data to productData
      });
  }

  // Method to handle form submission for updating the product
  submit(data: product) {
    if (this.productData) {
      data.id = this.productData.id; // Set the ID for the product being updated
    }
    // Call the updateProduct method from ProductService
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMeSSAGE = 'Product has updated'; // Set success message
        this.router.navigate(['seller-home']); // Navigate back to seller home after update
      }
    });
    // Clear the success message after 3 seconds
    setTimeout(() => {
      this.productMeSSAGE = undefined;
    }, 3000);
  }
}
