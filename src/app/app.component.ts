import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [ProductListComponent, HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'catalogoProducto';
}
