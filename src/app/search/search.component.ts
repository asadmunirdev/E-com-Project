import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';
import { EmptyStateComponent } from '../empty-state/empty-state.component'; // Import your EmptyStateComponent

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, PkrCurrencyPipe, EmptyStateComponent], // Add EmptyStateComponent here
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: undefined | product[]; // Variable to store search results

  constructor(private activeRoute: ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');

    // If a query exists, fetch search results from the ProductService
    query && this.product.searchProducts(query).subscribe((result) => {
      this.searchResult = result;
    });
  }
}
