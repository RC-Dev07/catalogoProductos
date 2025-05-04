import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];

  addCart(product: Product) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity! += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }

  getTotalItemsCount(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    );
  }
}
