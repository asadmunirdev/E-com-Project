import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { AllInOneComponent } from './all-in-one/all-in-one.component';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AllInOneComponent, HeaderComponent,HomeComponent, SellerAuthComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecom-project';
}
