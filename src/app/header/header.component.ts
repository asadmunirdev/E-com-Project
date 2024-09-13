import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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

  @ViewChild('navbarNav') navbarNav!: ElementRef;

  constructor(private route: Router) {}

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
      toggle: false
    });
    bsCollapse.hide();
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
}
