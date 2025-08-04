import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  imports: [MaterialModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
  }

  getItemsProduct(): number {
    return this.cartService.getTotalItemsCount();
  }
}
