// Importing necessary modules and dependencies
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';

@Component({
  selector: 'app-search', // Selector for the component
  standalone: true, // This component is standalone
  imports: [CommonModule, RouterModule, PkrCurrencyPipe], // Modules that this component uses
  templateUrl: './search.component.html', // Template URL for the HTML view
  styleUrl: './search.component.css' // Stylesheet for this component
})
export class SearchComponent implements OnInit {
  searchResult: undefined | product[]; // Variable to store search results

  // Injecting ActivatedRoute and ProductService through the constructor
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) {}

  // Lifecycle hook that runs when the component initializes
  ngOnInit(): void {
    // Retrieving the query parameter from the route
    let query = this.activeRoute.snapshot.paramMap.get('query');
    
    // If a query exists, fetch search results from the ProductService
    query && this.product.searchProducts(query).subscribe((result) => {
      this.searchResult = result;
    });
  }
}
