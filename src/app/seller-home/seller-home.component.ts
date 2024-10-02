// Importing necessary modules and dependencies
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';

@Component({
  selector: 'app-seller-home', // Selector for the component
  standalone: true, // This component is standalone
  imports: [CommonModule, RouterModule,PkrCurrencyPipe], // Modules that this component uses
  templateUrl: './seller-home.component.html', // Template URL for the HTML view
  styleUrl: './seller-home.component.css', // Stylesheet for this component
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[]; // Variable to store the list of products
  productMessage: undefined | string; // Variable to store success or error messages

  // Injecting ProductService through the constructor
  constructor(private product: ProductService) {}

  // Lifecycle hook that runs when the component initializes
  ngOnInit(): void {
    this.list(); // Fetch the list of products when the component initializes
  }

  // Method to handle product deletion
  deleteProduct(id: number) {
    console.warn('testing delete', id); // Log the product ID being deleted
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted'; // Display success message
        this.list(); // Refresh the product list
      }
    });

    // Clear the message after 3 seconds
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  // Method to fetch the list of products from the ProductService
  list() {
    this.product.productList().subscribe((result) => {
      this.productList = result; // Assign the result to productList
    });
  }
}
