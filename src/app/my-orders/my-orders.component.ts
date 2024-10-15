import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';
import { CommonModule } from '@angular/common';
import { PkrCurrencyPipe } from '../pipelines/pkr-currency.pipe';
import { EmptyStateComponent } from '../empty-state/empty-state.component'; // Import EmptyStateComponent
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, PkrCurrencyPipe, EmptyStateComponent], // Add EmptyStateComponent here
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orderData: order[] | undefined;
  selectedOrder: order | undefined;

  constructor(
    private product: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  // Method to cancel an order
  cancelOrder(orderId: number | undefined) {
    if (orderId) {
      this.product.cancelOrder(orderId).subscribe(() => {
        this.getOrderList(); // Refresh the order list

        // Show success toast for canceling the order
        const successMessage = '🎉 Order canceled successfully!';
        this.toastService.showToast(successMessage, 'success');
      });
    }
  }

  getOrderList() {
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

    // Method to get formatted product names and quantities
    getFormattedProducts(): string {
      if (!this.selectedOrder?.products) return ''; // Return an empty string if no products
  
      return this.selectedOrder.products
        .map(product => `${product.name} (Qty: ${product.quantity})`)
        .join(", ");
    }

}
