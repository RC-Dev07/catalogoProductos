import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly STORAGE_KEY = 'cartIems';
  private cartItems: Product[] = [];

  constructor() {
    this.loadCartFromStorage();
  }

  private saveCartToStorage(): void {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage(): void {
    const storedCart = sessionStorage.getItem(this.STORAGE_KEY);
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
  }

  addCart(product: Product) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity! += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.saveCartToStorage();
  }

  getCart(): Product[] {
    return [...this.cartItems];
  }

  getTotalItemsCount(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    );
  }

  clearCart(): void {
    this.cartItems = [];
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
}
