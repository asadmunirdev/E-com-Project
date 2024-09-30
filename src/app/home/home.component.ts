// Importing necessary modules and dependencies
import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home', // Selector for the component
  standalone: true, // This component is standalone
  imports: [NgbCarouselModule, CommonModule, RouterModule], // Modules that this component uses
  templateUrl: './home.component.html', // Template URL for the HTML view
  styleUrl: './home.component.css', // Stylesheet for this component
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | product[]; // Variable to store popular products
  trendyProducts: undefined | product[];  // Variable to store trendy products

  // Injecting the ProductService through the constructor
  constructor(private product: ProductService) {}

  // Lifecycle hook that runs when the component initializes
  ngOnInit(): void {
    // Fetching popular products from the ProductService
    this.product.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });

    // Fetching trendy products from the ProductService
    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    });
  }
}
