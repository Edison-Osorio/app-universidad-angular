import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    try {
      const token = sessionStorage.getItem('token');

      let newRequest = request;

      if (token != null || token != '') {
        newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      return next.handle(newRequest);
    } catch (error) {
      console.log('Ocurrio un error en el interceptor ', error);
      return next.handle(request);
    }
  }
}
