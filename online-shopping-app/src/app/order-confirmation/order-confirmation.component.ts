import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { Order } from '../models/Order';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.order = this.route.snapshot.data['order'];
    console.log("inside order confirmation");
    console.log(this.order);
  }
}
