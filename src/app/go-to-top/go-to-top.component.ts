import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-go-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './go-to-top.component.html',
  styleUrls: ['./go-to-top.component.css']
})
export class GoToTopComponent {
  isVisible = false; // Flag to control button visibility

  @HostListener('window:scroll', []) // Listen for scroll events
  onWindowScroll() {
    this.isVisible = window.scrollY > 300; // Show button after scrolling down 300px
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
  }
}
