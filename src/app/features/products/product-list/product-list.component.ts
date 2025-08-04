import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Product, RepuestaProducto } from '../../../interfaces/product';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { SearchService } from '../../../services/search.service';
import { MaterialModule } from '../../../shared/material.module';
import { ProductCardComponent } from '../components/product-card/product-card.component';

@Component({
  selector: 'product-list',
  imports: [MaterialModule, CommonModule, ProductCardComponent, NgxSkeletonLoaderModule ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly searchService = inject(SearchService);
  private readonly productService = inject(ProductService);
  private readonly cdRef = inject(ChangeDetectorRef);

  public products: Product[] = [];
  public filteredProducts: Product[] = [];

  skip = 0;
  limit = 8;
  total = 0;
  currentPage = 0;

  private searchTerm = '';
  public isLoading = true;

  ngOnInit(): void {
    this.listenToSearch();
  }

  private listenToSearch(): void {
    this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.skip = 0;
      this.loadProducts();
    });
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.productService.getAll(this.skip, this.limit, this.searchTerm)
      .subscribe((resp: RepuestaProducto) => {
        this.products = resp.products;
        this.total = resp.total;
      }).add(()=>{
        this.isLoading = false;
        this.cdRef.markForCheck();
      })
  }
  
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.skip = event.pageIndex * event.pageSize;
    this.limit = event.pageSize;
    this.loadProducts();
  }

  handleAddToCart(product: Product): void {
    this.cartService.addCart(product);
  }
}
