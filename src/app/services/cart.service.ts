import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'cartIems';
  private cartItems: Product[] = [];

  private readonly toastr = inject(ToastrService);

  constructor() {
    this.loadCartFromStorage();
  }

  private saveCartToStorage(): void {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItems));
  }

  public loadCartFromStorage() {
    const storedCart = sessionStorage.getItem(this.STORAGE_KEY);
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
  }

  addCart(product: Product) {
    this.toastr.success(`"${product.title}" se agregó al carrito.`, 'Producto agregado');
    const existingItem = this.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity! += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.saveCartToStorage();
  }

  removeCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
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

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(p => p.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCartToStorage();
    }
  }
}
