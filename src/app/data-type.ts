export interface signUp {
  name: string;
  email: string;
  password: string;
}

export interface login {
  // This should be lowercase 'string'
  email: string; // Change String to string
  password: string; // Change String to string
}

export interface product {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id: number;
  quantity: undefined | number;
  productId: undefined | number;
}

export interface cart {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id: number | undefined;
  quantity: undefined | number;
  productId: number;
  userId: number;
}

export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}
export interface order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: number;
  paymentMethod: string; // Payment method field
  products: string[]; // Array of product names
  id: number | undefined;
}

export interface category {
  id: number; // Unique identifier for the category
  name: string; // Name of the category
}


//? Reviews// data-type.ts
export interface Review {
  name: string;
  text: string;
  rating: number;
  image: string; // URL of the customer's image
  date: string; // Date of the review
  isExpanded?: boolean; // Optional property for toggle functionality
}

// Sample review data
export const reviews: Review[] = [
    {
      name: 'John Doe',
      text: 'I recently purchased a smartphone from Asad-Shop, and I couldn’t be happier! The delivery was fast, and the phone works like a charm. The features are amazing, especially the camera quality which captures stunning photos. I’ve taken numerous pictures, and they all turn out beautifully. The battery life is impressive too, lasting all day even with heavy usage. Overall, it has exceeded my expectations in every way.',
      rating: 5,
      image: 'https://img.freepik.com/premium-photo/schoolboy-with-backpack-standing-front-white-background_181203-17907.jpg?w=740',
      date: 'September 15, 2024',
      isExpanded: false, // Initialize the property
    },
    {
      name: 'Jane Smith',
      text: 'As a regular shopper at Asad-Shop, I always find great deals. My latest order was for a pair of headphones, and they are excellent. The sound quality is top-notch, and they are super comfortable for long listening sessions. I’ve used them for everything from workouts to long commutes, and they never disappoint. Plus, the battery life is incredible! I can go days without needing to recharge them. I highly recommend these headphones to anyone looking for quality sound and comfort.',
      rating: 4,
      image: 'https://img.freepik.com/premium-photo/captivating-cartoon-characters-cute-kids-playful-boys-lovely-girls-digital-world_1142283-14203.jpg?w=740',
      date: 'September 20, 2024',
      isExpanded: false, // Initialize the property
    },
    {
      name: 'Alice Johnson',
      text: 'I bought a kitchen appliance and was pleasantly surprised by the quality. It arrived in perfect condition, and I started using it right away. The instructions were clear, and it has made my cooking experience so much easier. I’ve experimented with several recipes, and this appliance has consistently delivered great results. The design is also sleek and modern, fitting perfectly in my kitchen. It has quickly become one of my favorite tools, and I can’t imagine cooking without it now!',
      rating: 5,
      image: 'https://img.freepik.com/free-photo/3d-rendering-cartoon-boy_23-2150797600.jpg?t=st=1728046756~exp=1728050356~hmac=77bb94d53a3b91bdeeaf9c48591d0fa8487873efee99909235e90ac0a651693d&w=740',
      date: 'September 25, 2024',
      isExpanded: false, // Initialize the property
    },
  ];
    // Add more detailed reviews as needed
