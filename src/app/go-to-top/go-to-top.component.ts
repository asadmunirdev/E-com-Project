import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-go-to-top',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './go-to-top.component.html',
  styleUrls: ['./go-to-top.component.css']
})
export class GoToTopComponent {
  showTopButton: boolean = false;
  showBottomButton: boolean = false;
  lastScrollTop: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Determine if at the top or bottom of the page
    const atTop = scrollTop === 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight;

    // Hide buttons if at the top or bottom
    if (atTop || atBottom) {
      this.showTopButton = false;
      this.showBottomButton = false;
      return; // Exit early
    }

    // User is not at the top or bottom
    if (scrollTop > this.lastScrollTop) {
      // User is scrolling down
      this.showTopButton = false;  // Hide "Go to Top" button
      this.showBottomButton = true; // Show "Go to Bottom" button
    } else {
      // User is scrolling up
      this.showTopButton = true;    // Show "Go to Top" button
      this.showBottomButton = false; // Hide "Go to Bottom" button
    }

    this.lastScrollTop = scrollTop; // Update last scroll position
  }

  // Scroll to the top of the page
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Scroll to the bottom of the page
  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}
