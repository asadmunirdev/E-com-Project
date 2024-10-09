import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Review, reviews } from '../data-type'; // Importing the Review interface and review data

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews: Review[] = reviews; // Use imported reviews
  currentIndex: number = 0;

  nextReview() {
    this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
  }

  prevReview() {
    this.currentIndex = (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
  }

  toggleText(review: Review) {
    review.isExpanded = !review.isExpanded; // Toggle the expanded state for the review
  }
}
