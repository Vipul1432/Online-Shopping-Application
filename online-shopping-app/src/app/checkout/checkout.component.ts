import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CartService } from "../services/cart.service";
import { Component } from "@angular/core";

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

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  placeOrder(): void {
    const order = {
      shippingDetails: this.shippingDetails,
      cart: this.cartService.getCart(),
      total: this.cartService.calculateTotal()
    };
  
    this.cartService.clearCart();
  
    this.authService.updateUserCart(order.cart, this.shippingDetails.name).subscribe(
      () => {
        console.log('Cart updated locally');
        this.router.navigate(['/confirmation'], { state: { order } });
      },
      (error) => {
        console.error('Error updating cart locally:', error);
      }
    );
  }
  
}
