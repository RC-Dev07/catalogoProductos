import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'product-card',
  imports: [MaterialModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  private readonly router = inject(Router);

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  goToProductDetail(id: number) {
    this.router.navigate(['/product-detail', id]);
  }
}
