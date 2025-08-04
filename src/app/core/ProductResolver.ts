import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Product } from "../interfaces/product";
import { ProductService } from "../services/product.service";

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Product> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    const id = Number(route.paramMap.get('id'));
    return this.productService.getById(id);
  }
}