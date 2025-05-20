import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { MaterialModule } from '../../shared/material.module';
import { CartComponent } from '../cart/cart.component';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, CommonModule, CartComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();
  @ViewChild('searchInput') searchInputRef!: ElementRef;
  
  private readonly router = inject(Router);
  private readonly searchService = inject(SearchService);

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.setSearchTerm(input.value);
    this.router.navigate(['/']);
  }

  productsPage(): void {
    this.router.navigate(['/']);
    this.searchService.setSearchTerm('');
    if (this.searchInputRef) {
      this.searchInputRef.nativeElement.value = '';
    }
  }
}
