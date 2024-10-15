import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // menuType: string = 'default';
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  userName: string = '';
  cartItems = 0;
  @ViewChild('navbarNav') navbarNav!: ElementRef;

  constructor(
    private route: Router,
    private product: ProductService,
    private user: UserService,
    private toastService:ToastService
  ) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // Check for seller
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          const sellerStore = localStorage.getItem('seller');
          const sellerData = sellerStore ? JSON.parse(sellerStore) : null;
          this.sellerName = sellerData ? sellerData.name.split(' ')[0] : ''; // Get only first name
        }
        // Check for user regardless of the URL path
        else if (localStorage.getItem('user')) {
          this.menuType = 'user';
          const userStore = localStorage.getItem('user');
          const userData = userStore ? JSON.parse(userStore) : null; // Adjust to parse directly
          this.userName = userData ? userData.name.split(' ')[0] : ''; // Get only first name
          this.product.getCartList(userData.id);
        }
        // Default case
        else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  collapseNavbar(): void {
    const collapseElement = this.navbarNav.nativeElement;
    const bsCollapse = new (window as any).bootstrap.Collapse(collapseElement, {
      toggle: false,
    });
    bsCollapse.hide();
  }
// Method for seller logout
sellerLogout() {
  try {
    localStorage.removeItem('seller');
    this.route.navigate(['/seller-auth']);
    
    // Show success toast using the ToastService
    this.toastService.showToast("Seller logged out successfully!", "success");
  } catch (error) {
    // Show error toast using the ToastService
    this.toastService.showToast("Failed to log out. Please try again.", "error");
  }
}

// Method for user logout
userLogout() {
  try {
    localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
    this.product.cartData.emit([]);
    
    // Show success toast using the ToastService
    this.toastService.showToast("User logged out successfully!", "success");
  } catch (error) {
    // Show error toast using the ToastService
    this.toastService.showToast("Failed to log out. Please try again.", "error");
  }
}

    
  searchProducts(query: KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    // console.warn(element.value);

    const searchTerm = element.value; // Ensure clean input

    if (searchTerm) {
      this.product.searchProducts(searchTerm).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result; // Store search results
        // console.log(result);
      });
    } else {
      this.searchResult = []; // Clear results if no input
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number) {
    this.route.navigate(['/details', id]);
  }

  submitSearch(val: string) {
    this.route.navigate([`search/${val}`]);
  }
}
