import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  order: any[] | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.order = JSON.parse(localStorage.getItem('users') || '[]');
    console.log("inside order confirmation");
    console.log(this.order);
  }

  calculateTotal(cart: any[]): number {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }
}
