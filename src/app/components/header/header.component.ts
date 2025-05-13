import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, CommonModule, CartComponent, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();

  private readonly searchService = inject(SearchService);

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.setSearchTerm(input.value);
  }
}
