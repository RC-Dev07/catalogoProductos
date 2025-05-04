import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [MaterialModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private cartService: CartService) {}

  getItemsProduct(): number {
    return this.cartService.getTotalItemsCount();
  }
}
