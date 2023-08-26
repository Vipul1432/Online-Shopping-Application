import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  shippingDetails = {
    name: '',
    address: ''
  };

  constructor(private cartService: CartService, private router: Router) {}

  placeOrder(): void {
    const order = {
      shippingDetails: this.shippingDetails,
      cart: this.cartService.getCart(),
      total: this.cartService.calculateTotal()
    };

    this.cartService.clearCart();
    console.log("inside checkout");
    console.log(order.cart.forEach(x => x.name));
    this.router.navigate(['/confirmation'], { state: { order } }); 
  }
}
