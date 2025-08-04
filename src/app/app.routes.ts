import { Routes } from '@angular/router';
import { ProductResolver } from './core/ProductResolver';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/products/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'product-detail/:id',
    loadComponent: () =>
      import(
        './features/products/product-details/product-details.component'
      ).then((m) => m.ProductDetailsComponent),
      resolve: { product: ProductResolver }
  },
  {
    path: 'cart-items',
    loadComponent: () =>
      import('./features/cart/cart-items/cart-items.component').then(
        (m) => m.CartItemsComponent
      ),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
