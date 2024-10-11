// Importing necessary modules and dependencies
import { HttpClient } from '@angular/common/http'; // For making HTTP requests
import { EventEmitter, Injectable } from '@angular/core'; // For creating injectable services and event emitters
import { cart, category, order, product } from '../data-type'; // Importing data types for products and cart
import { Router } from '@angular/router'; // For navigation

@Injectable({
  providedIn: 'root', // Makes this service available throughout the application
})
export class ProductService {
  // Event emitter to communicate cart data changes
  cartData = new EventEmitter<product[] | []>();

  // Constructor to inject HttpClient and Router services
  constructor(private http: HttpClient, private router: Router) {}

  //* Method to fetch categories
  getCategories() {
    return this.http.get<category[]>('http://localhost:3000/categories');
  }

  //* Adding Product API Service
  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data); // Sends POST request to add a product
  }

  //* Showing Product API Service
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products'); // Retrieves the list of products
  }

  //* Deleting Product API Service
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`); // Sends DELETE request to remove a product by ID
  }

  //* Prefill Product API Service
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`); // Retrieves a single product by ID
  }

  //* Update Product API Service
  updateProduct(product: product) {
    return this.http.put<product>( // Sends PUT request to update a product
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }

  //* Products in Carousel
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3'); // Retrieves popular products limited to 5
  }

  //* Products in Cards
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products'); // Retrieves all products for display in cards
  }

  //* Products in Search Bar
  searchProducts(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    ); // Searches products based on a query
  }

  //* Add Product to Cart by Local Storage
  localAddToCart(data: product) {
    let cartData = []; // Initialize cart data array
    let localCart = localStorage.getItem('localCart'); // Get local cart from local storage
    if (!localCart) {
      // If no cart exists, create a new one
      localStorage.setItem('localCart', JSON.stringify([data])); // Store the product in local storage
      this.cartData.emit([data]); // Emit the updated cart data
    } else {
      // If a cart already exists, add the new product
      cartData = JSON.parse(localCart); // Parse existing cart data
      cartData.push(data); // Add new product to the cart
      localStorage.setItem('localCart', JSON.stringify(cartData)); // Update local storage with new cart
      this.cartData.emit(cartData); // Emit the updated cart data
    }
  }

  //* Remove Product from Cart by Local Storage
  removeItemsFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart'); // Get local cart from local storage
    if (cartData) {
      let items: product[] = JSON.parse(cartData); // Parse existing cart data
      items = items.filter((item: product) => productId !== item.id); // Filter out the product to be removed
      localStorage.setItem('localCart', JSON.stringify(items)); // Update local storage with filtered cart
      this.cartData.emit(items); // Emit the updated cart data
    }
  }

  //* Add to Cart with User Logged In
  addtoCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData); // Sends POST request to add the product to the user's cart
  }

  //* Getting Cart List
  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      }) // Retrieves the cart list for a specific user
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body); // Emit the cart data
        }
      });
  }

  //* Remove From Cart
  removeToCart(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`); // Sends DELETE request to remove a specific item from the cart
  }

  //* Cart Page
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(
      'http://localhost:3000/cart?userId=' + userData.id
    );
  }
  //* Chexkout Page API
  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }

  //* My Order Page API
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(
      'http://localhost:3000/orders?userId=' + userData.id
    );
  }

  //* Delete CardItems API
  deleteCartItems(cartId:number){
    return this.http.delete(`http://localhost:3000/cart/${cartId}`,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([])
      }
    })
  }

  //* Cancel Order API
  cancelOrder(orderId:number){
return this.http.delete(`http://localhost:3000/orders/${orderId}`)
  }
}
