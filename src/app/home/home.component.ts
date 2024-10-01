import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product, category } from '../data-type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, RouterModule, FormsModule], // Added FormsModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Corrected from styleUrl to styleUrls
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  categories: category[] = []; // New variable to hold categories
  selectedCategory: string = ''; // Variable to hold the selected category
  filteredProducts: product[] = []; // Array to hold filtered products

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });

    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
      this.filteredProducts = data; // Initially display all trendy products
    });

    this.product.getCategories().subscribe((data) => {
      this.categories = data; // Load categories from the service
      // console.log('Loaded categories:', this.categories); 
      // Log loaded categories
    });
  }

  // Method to filter products based on the selected category
  filterProducts(): void {
    if (this.selectedCategory) {
      this.filteredProducts = this.trendyProducts?.filter(
        (item) => item.category === this.selectedCategory
      ) || [];
    } else {
      this.filteredProducts = this.trendyProducts || []; // Show all products if no category is selected
    }
  }
}
