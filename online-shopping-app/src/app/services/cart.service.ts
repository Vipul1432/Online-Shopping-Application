import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  getCart(): Product[] {
    return this.cart;
  }

  clearCart(): void {
    this.cart = [];
  }

  calculateTotal(): number {
    return this.cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
  }
}
