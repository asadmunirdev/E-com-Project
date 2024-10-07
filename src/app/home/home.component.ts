import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product, category } from '../data-type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';
import { ReviewsComponent } from "../reviews/reviews.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, RouterModule, FormsModule, PkrCurrencyPipe, ReviewsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Properties for popular products, trendy products, and categories
  popularProducts: undefined | product[]; // Array to store popular products
  trendyProducts: undefined | product[]; // Array to store trendy products
  categories: category[] = []; // Array to store product categories
  selectedCategory: string = ''; // Selected category for filtering products
  filteredProducts: product[] = []; // Array for filtered products based on the selected category
  displayedProducts: product[] = []; // Array for the currently displayed products
  currentIndex: number = 0; // Index to track how many products are shown
  itemsToShow: number = 8; // Number of items to show initially
  hasMoreProducts: boolean = true; // Flag to control the visibility of the Load More button

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    // Load popular products
    this.product.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });

    // Load trendy products and initialize displayed products
    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
      this.filteredProducts = data;
      this.displayedProducts = this.filteredProducts.slice(0, this.itemsToShow); // Show initial products
      this.hasMoreProducts = this.displayedProducts.length < this.filteredProducts.length; // Check if there are more products to display
    });

    // Load product categories
    this.product.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  // Function to load more products when "Load More" button is clicked
  loadMore(): void {
    const currentSize = this.displayedProducts.length;

    const nextProducts = this.filteredProducts.slice(currentSize, currentSize + this.itemsToShow);
    this.displayedProducts = [...this.displayedProducts, ...nextProducts];

    // Check if there are more products to display
    this.hasMoreProducts = this.displayedProducts.length < this.filteredProducts.length;
  }

  // Function to filter products based on the selected category
  filterProducts(): void {
    if (this.selectedCategory) {
      this.filteredProducts = this.trendyProducts?.filter(
        (item) => item.category === this.selectedCategory
      ) || [];
    } else {
      this.filteredProducts = this.trendyProducts || [];
    }

    // Reset displayed products based on the new filter
    this.displayedProducts = this.filteredProducts.slice(0, this.itemsToShow);
    this.hasMoreProducts = this.displayedProducts.length < this.filteredProducts.length; // Check if more products are available
  }
}
