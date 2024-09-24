import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;

  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  openLogin(): void {
    this.showLogin = true;
  }

  openSignUp(): void {
    this.showLogin = false;
  }

  signUp(form: any): void {
    if (form.valid) {
      const data: signUp = form.value;
      this.user.userSignUp(data);
    } else {
      console.log('Sign Up Form is invalid');
    }
  }

  login(form: any): void {
    if (form.valid) {
      const data: signUp = form.value;
      this.user.userLogin(data);
    } else {
      console.log('Login Form is invalid');
    }
  }
}
