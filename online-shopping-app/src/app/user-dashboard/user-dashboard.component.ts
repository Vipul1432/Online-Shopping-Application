// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { CartService } from '../services/cart.service';
// import { OrderResolver } from '../services/order-resolver.service';
// import { User } from '../models/User';
// import { Order } from '../models/order';

// @Component({
//   selector: 'app-user-dashboard',
//   templateUrl: './user-dashboard.component.html',
//   styleUrls: ['./user-dashboard.component.css']
// })
// export class UserDashboardComponent implements OnInit {
//   user: User;
//   cartItems: CartItem[] = [];
//   orderHistory: Order[] = [];

//   constructor(
//     private authService: AuthService,
//     private cartService: CartService,
//     private orderService: OrderResolver
//   ) {}

//   ngOnInit(): void {
//     this.user = this.authService.getCurrentUser();
//     this.cartItems = this.cartService.getCart();
//     this.orderHistory = this.orderService.getCart();
//   }
// }
