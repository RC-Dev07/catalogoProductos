import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';
import { Product, RepuestaProducto } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly http = inject(HttpClient);
  private readonly toastr = inject(ToastrService);
  private readonly baseUrl = 'https://dummyjson.com/products';

  getAll(skip = 0, limit = 10, q = ''): Observable<RepuestaProducto> {
    let params = new HttpParams()
      .set('skip', skip)
      .set('limit', limit);

    if (q) {
      params = params.set('q', q);
    }

    return this.http.get<RepuestaProducto>(`${this.baseUrl}/search`, { params }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 0:
        this.toastr.error('No hay conexión con el servidor.', 'Error de red');
        break;
      case 400:
        this.toastr.warning('Solicitud inválida. Verifica los datos enviados.', 'Error 400');
        break;
      case 401:
        this.toastr.warning('No autorizado. Inicia sesión nuevamente.', 'Error 401');
        break;
      case 403:
        this.toastr.warning('Acceso denegado. No tienes permisos.', 'Error 403');
        break;
      case 404:
        this.toastr.info('Recurso no encontrado.', 'Error 404');
        break;
      case 500:
        this.toastr.error('Error interno del servidor.', 'Error 500');
        break;
      default:
        this.toastr.error('Ha ocurrido un error inesperado.', `Error ${error.status}`);
        break;
    }

    return throwError(() => error);
  }
}