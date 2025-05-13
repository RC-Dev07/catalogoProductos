import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-cart-items',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss',
})
export class CartItemsComponent {
  private readonly fb = inject(FormBuilder);

  formEnvio = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
    direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    zona: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    ciudad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });
  
  enviarPedido(): void {
    if (this.formEnvio.invalid) return this.formEnvio.markAllAsTouched();
    console.log(this.formEnvio.value);
    window.alert("Se envio el pedido correctamente")
  }
}
