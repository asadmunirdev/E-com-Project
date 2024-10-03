import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-go-to-top',
  standalone: true,
  imports: [CommonModule, MatIconModule],
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.onButtonClick(); // Close the card after action
  }

  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    this.onButtonClick(); // Close the card after action
  }

  goBack() {
    if (window.history.length > 1) {
      window.history.back(); // Go back to the previous page
    } else {
      window.location.href = '/'; // Fallback to the homepage if no history
    }
    this.onButtonClick(); // Close the card after action
  }
}
