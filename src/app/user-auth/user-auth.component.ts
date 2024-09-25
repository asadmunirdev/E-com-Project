import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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
  authError: string = '';

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
        }
      });
    } else {
      console.log('Login Form is invalid');
    }
  }
  
}
