import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../services/cart.service';
import { MaterialModule } from '../../../shared/material.module';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-items',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss',
})
export class CartItemsComponent implements OnInit{

  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  public products: Product[] = [];


  formEnvio = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
    direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    zona: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    ciudad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });

  ngOnInit(): void {
    this.refreshCart();
  }

  private refreshCart(): void {
    this.products = this.cartService.getCart();
  }

  get countProduct():number{
    return this.products.length
  }

  getTotalPrice(): number {
    return this.products.reduce(
      (total, product) => total + (product.price * (product.quantity || 0)),
      0
    );
  }

  removeProduct(productId:number):void{
    this.cartService.removeCart(productId)
    this.refreshCart();
  }
  
  enviarPedido(): void {
    if (this.formEnvio.invalid) return this.formEnvio.markAllAsTouched();
    console.log(this.formEnvio.value);
    this.toastr.success('¡Pedido enviado con éxito!', 'Éxito', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true
    });
    this.formEnvio.reset();
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }

  increaseQuantity(product:Product):void{
    this.cartService.addCart(product)
    this.refreshCart();
  }

  decreaseQuantity(product: Product): void {
    if (product.quantity && product.quantity > 1) {
      product.quantity -= 1;
      this.cartService.updateQuantity(product.id, product.quantity);
    } else {
      this.cartService.removeCart(product.id);
    }
    this.refreshCart();
  }
}
