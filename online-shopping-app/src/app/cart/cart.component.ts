import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.updateTotal();
  }
  

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.updateTotal();
  }

  updateQuantity(item: Product): void {
    if (item.quantity === undefined) {
      item.quantity = 0;
    }
    this.updateTotal();
  }

  updateTotal(): void {
    this.total = this.cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  }
  
  checkout(): void {
    // Navigate to the checkout page
    this.router.navigate(['/checkout']);
  }
  
}
