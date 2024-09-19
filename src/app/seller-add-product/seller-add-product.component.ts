import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductForm: FormGroup;
  addProductMessage: string | undefined;

  constructor(private fb: FormBuilder, private product: ProductService) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      color: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submit() {
    if (this.addProductForm.valid) {
      const formData: product = this.addProductForm.value;
      this.product.addProduct(formData).subscribe((result) => {
        if (result) {
          this.addProductMessage = "Product is added successfully";
          this.addProductForm.reset(); // Reset form after submission
        }
        setTimeout(() => this.addProductMessage = undefined, 3000);
      });
    }
  }
}
