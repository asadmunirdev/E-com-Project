import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage: undefined | string;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    console.warn('testing delete', id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      // console.log(result);
      this.productList = result;
    });
  }
}
