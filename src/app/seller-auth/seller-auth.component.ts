import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { signUp } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  authError: string = '';

  constructor(private seller: SellerService) {}

  ngOnInit(): void {
    this.seller.reloadSeller();
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
      console.log(data);
      this.seller.userSignUp(data);
    } else {
      console.log('Form is invalid');
    }
  }

  login(form: NgForm): void {
    if (form.valid) {
      const data: signUp = form.value;
      this.seller.userLogin(data);
      this.seller.isLoginError.subscribe((isError) => {
        if (isError) {
          this.authError = 'email or password is not correct';
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
