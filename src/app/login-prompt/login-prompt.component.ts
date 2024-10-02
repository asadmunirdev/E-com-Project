import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-prompt',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login-prompt.component.html',
  styleUrls: ['./login-prompt.component.css'], // Corrected to styleUrls
})
export class LoginPromptComponent {
  constructor(private router: Router) {}

  loginPage() {
    this.router.navigate(['user-auth']); // Redirect to the login page
  }
}
