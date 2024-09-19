import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];

  @ViewChild('navbarNav') navbarNav!: ElementRef;

  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  collapseNavbar(): void {
    const collapseElement = this.navbarNav.nativeElement;
    const bsCollapse = new (window as any).bootstrap.Collapse(collapseElement, {
      toggle: false,
    });
    bsCollapse.hide();
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  searchProducts(query: KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    console.warn(element.value);

    const searchTerm = element.value; // Ensure clean input

    if (searchTerm) {
      this.product.serachProducts(searchTerm).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result; // Store search results
        console.log(result);
        
      });
    } else {
      this.searchResult = []; // Clear results if no input
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val:string){
this.route.navigate([`search/${val}`])
  }

}
