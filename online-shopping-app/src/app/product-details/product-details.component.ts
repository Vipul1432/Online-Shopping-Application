import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService 
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      this.productService.getProductById(this.productId).subscribe(product => {
        this.product = product;
      });
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product); 
    }
  }
}
