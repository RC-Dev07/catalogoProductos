import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-product-details',
  imports: [MaterialModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
 
  public product!:Product;
  public selectedImage:string = '';
  public sizes:string []= [];

  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);


  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
     this.productService.getById(productId).subscribe((product:Product) => {
      if (product) {
          this.product = product;
          this.selectedImage = this.product.images[0];
          this.sizes = [
            `Width: ${this.product.dimensions.width} cm`,
            `Height: ${this.product.dimensions.height} cm`,
            `Depth: ${this.product.dimensions.depth} cm`
          ];
        }
    });
  }

  onAddToCart(): void {
    this.cartService.addCart(this.product);
  }
}

