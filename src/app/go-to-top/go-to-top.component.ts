import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // Import Material Icon Module
@Component({
  selector: 'app-go-to-top',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './go-to-top.component.html',
  styleUrls: ['./go-to-top.component.css']
})
export class GoToTopComponent {
  isCardVisible = false; // Flag to control card visibility

  // Function to toggle card visibility
  toggleCard() {
    this.isCardVisible = !this.isCardVisible;
  }

  // Function to handle button click and close the card
  onButtonClick() {
    this.isCardVisible = false; // Hide the card when any button is clicked
  }

  // Scroll to the top of the page
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.onButtonClick(); // Close the card after action
  }

  // Scroll to the bottom of the page
  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    this.onButtonClick(); // Close the card after action
  }

  // Go back to the previous page
  goBack() {
    if (window.history.length > 1) {
      window.history.back(); // Go back to the previous page
    } else {
      window.location.href = '/'; // Fallback to the homepage if no history
    }
    this.onButtonClick(); // Close the card after action
  }
}
