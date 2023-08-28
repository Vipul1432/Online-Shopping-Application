import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);
      this.filterProducts();
    });
  }

  filterProducts(): void {
    if (!this.searchTerm) {
      this.filteredProducts = this.products; // Display all products if search term is empty
    } else {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.title && product.title.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
  }
  
  
}
