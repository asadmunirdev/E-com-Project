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
  showButtons = true; // Flag to control visibility when reaching the footer

  @HostListener('window:scroll', []) // Listen for scroll events
  onWindowScroll() {
    const footerElement = document.querySelector('footer'); // Adjust this if your footer has a different tag or class
    const footerOffsetTop = footerElement ? footerElement.offsetTop : 0;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY + windowHeight;

    this.isVisible = window.scrollY > 300; // Show buttons after scrolling down 300px
    
    // Check if user has reached or passed the footer
    this.showButtons = scrollPosition < footerOffsetTop;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
  }

  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Smooth scroll to the bottom
  }
}
