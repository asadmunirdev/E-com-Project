import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,  
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {}
