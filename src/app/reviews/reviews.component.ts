import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Review {
  name: string;
  text: string;
  rating: number;
  image: string; // URL of the customer's image
  date: string; // Date of the review
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews: Review[] = [
    {
      name: 'John Doe',
      text: 'I recently purchased a smartphone from Asad-Shop, and I couldn’t be happier! The delivery was fast, and the phone works like a charm. The features are amazing, especially the camera quality which captures stunning photos.',
      rating: 5,
      image: 'https://img.freepik.com/premium-photo/schoolboy-with-backpack-standing-front-white-background_181203-17907.jpg?w=740',
      date: 'September 15, 2024'
    },
    {
      name: 'Jane Smith',
      text: 'As a regular shopper at Asad-Shop, I always find great deals. My latest order was for a pair of headphones, and they are excellent. The sound quality is top-notch, and they are super comfortable for long listening sessions. ',
      rating: 4,
      image: 'https://img.freepik.com/premium-photo/captivating-cartoon-characters-cute-kids-playful-boys-lovely-girls-digital-world_1142283-14203.jpg?w=740',
      date: 'September 20, 2024'
    },
    {
      name: 'Alice Johnson',
      text: 'I bought a kitchen appliance and was pleasantly surprised by the quality. It arrived in perfect condition, and I started using it right away. The instructions were clear, and it has made my cooking experience so much easier.',
      rating: 5,
      image: 'https://img.freepik.com/free-photo/3d-rendering-cartoon-boy_23-2150797600.jpg?t=st=1728046756~exp=1728050356~hmac=77bb94d53a3b91bdeeaf9c48591d0fa8487873efee99909235e90ac0a651693d&w=740',
      date: 'September 25, 2024'
    }
    // Add more detailed reviews as needed
  ];
  
  currentIndex: number = 0;

  nextReview() {
    this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
  }

  prevReview() {
    this.currentIndex = (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
  }
}
