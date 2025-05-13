import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { CartItemsComponent } from './features/cart/cart-items/cart-items.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'cart-items', component: CartItemsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
