import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { cart, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';

  constructor(private user: UserService, private product: ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  openLogin(): void {
    this.showLogin = true;
  }

  openSignUp(): void {
    this.showLogin = false;
  }

  signUp(form: NgForm): void {
    if (form.valid) {
      const data: signUp = form.value;
      this.user.userSignUp(data);
    } else {
      console.log('Sign Up Form is invalid');
    }
  }

  login(form: NgForm): void {
    if (form.valid) {
      const data: signUp = form.value;
      this.user.userLogin(data);
      this.user.isLoginError.subscribe((isError) => {
        if (isError) {
          this.authError = 'Please enter valid user details';
        } else {
          this.localCartToRemoteCart();
        }
      });
    } else {
      console.log('Login Form is invalid');
    }
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addtoCart(cartData).subscribe((result) => {
            if (result) {
              console.log('item stored in db');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
  }
}
