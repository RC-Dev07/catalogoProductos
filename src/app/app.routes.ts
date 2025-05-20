import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { CartItemsComponent } from './features/cart/cart-items/cart-items.component';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product-detail/:id', component: ProductDetailsComponent },
  { path: 'cart-items', component: CartItemsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
