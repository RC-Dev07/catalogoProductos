import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, RepuestaProducto } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private baseUrl = 'https://dummyjson.com/products';

   getAll(skip = 0, limit = 10, q = ''): Observable<RepuestaProducto> {
    let params = new HttpParams()
      .set('skip', skip)
      .set('limit', limit);

    if (q) {
      params = params.set('q', q);
    }
    return this.http.get<RepuestaProducto>(`${this.baseUrl}/search`, { params });
  }

  getById(id: number): Observable<Product> {
      return this.http.get<Product>(`${this.baseUrl}/${id}`);
    }
}
