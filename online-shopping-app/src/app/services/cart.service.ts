import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartItemsCountSubject = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCountSubject.asObservable();

  addToCart(product: Product): void {
    this.cart.push(product);
    this.cartItemsCountSubject.next(this.cart.length);
  }

  getCart(): Product[] {
    return this.cart;
  }

  clearCart(): void {
    this.cart = [];
    this.cartItemsCountSubject.next(0);
  }

  calculateTotal(): number {
    return this.cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    this.cartItemsCountSubject.next(this.cart.length);
  }
}
