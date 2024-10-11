import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule, RouterModule, PkrCurrencyPipe, FormsModule],
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[]; // All products
  filteredProducts: product[] = [];   // Filtered products
  categories: string[] = [];          // Available categories
  selectedCategory: string = '';      // Selected category
  productMessage: undefined | string; // Success or error message

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list(); // Load products on component initialization
  }

  // Fetch product list
  list() {
    this.product.productList().subscribe((result) => {
      this.productList = result;
      this.filteredProducts = result; // Initially, all products are displayed
      this.setCategories(); // Extract categories from product list
    });
  }

  // Extract categories from the product list
  setCategories() {
    if (this.productList) {
      this.categories = Array.from(new Set(this.productList.map(product => product.category)));
    }
  }

  // Filter products based on the selected category
  filterProducts() {
    if (this.selectedCategory) {
      this.filteredProducts = this.productList?.filter(
        (product) => product.category === this.selectedCategory
      ) || [];
    } else {
      this.filteredProducts = this.productList || [];
    }
  }

  // Delete a product and update the list
  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        this.list(); // Reload the product list after deletion
      }
    });

    // Clear the message after 3 seconds
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
