import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { ProductService } from '../../../../services/product.service';
import { MaterialModule } from '../../../../shared/material.module';
import { ProductCardComponent } from '../../product-card/product-card.component';
import { SearchService } from '../../../../services/search.service';

@Component({
  selector: 'product-list',
  imports: [MaterialModule, CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private readonly cartService = inject(ProductService);
  private readonly searchService = inject(SearchService);

  products: Product[] = [
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    },
  ];

  public filteredProducts: Product[] = [];

  ngOnInit() {
    this.searchService.searchTerm$.subscribe((term) => {
      this.filteredProducts = this.products.filter((p) =>
        p.title.toLowerCase().includes(term.toLowerCase())
      );
      console.log(this.filteredProducts);
    });
  }

  handleAddToCart(product: Product): void {
    this.cartService.addCart(product);
  }
}
