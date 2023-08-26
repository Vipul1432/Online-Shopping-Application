import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CartService } from './cart.service'; // Make sure the path is correct

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<any> {
  constructor(private cartService: CartService) {}

  resolve() {
    // Use the CartService to get the order data from the cart
    const order = {
      cart: this.cartService.getCart(), // Make sure getCart() returns the correct data
      total: this.cartService.calculateTotal()
    };

    console.log('inside order resolver', order); // Debug log

    return order;
  }
}
