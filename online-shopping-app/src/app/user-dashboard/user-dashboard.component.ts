import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
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
