import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-product-details',
  imports: [MaterialModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit {
 
  public product!:Product;
  public selectedImage:string = '';
  public sizes:string []= [];

  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);


ngOnInit(): void {
  this.route.data.subscribe(({ product }) => {
    if (product) {
      this.product = product;
      this.selectedImage = product.thumbnail || product.images[0];

      this.preloadImage(this.selectedImage);

      this.sizes = [
        `Width: ${product.dimensions.width} cm`,
        `Height: ${product.dimensions.height} cm`,
        `Depth: ${product.dimensions.depth} cm`
      ];
    }
  });
}

  onAddToCart(): void {
    this.cartService.addCart(this.product);
  }

  private preloadImage(url: string): void {
    if (!url) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  }
}

