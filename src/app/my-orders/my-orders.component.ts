import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, PkrCurrencyPipe],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orderData: order[] | undefined;
  selectedOrder: order | undefined;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }

  showDetails(order: order): void {
    this.selectedOrder = order;
  }

  closeDetails(): void {
    this.selectedOrder = undefined;
  }
}
