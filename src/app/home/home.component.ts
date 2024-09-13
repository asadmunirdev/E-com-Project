import { Component } from '@angular/core';
import { AllInOneComponent } from "../all-in-one/all-in-one.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AllInOneComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
