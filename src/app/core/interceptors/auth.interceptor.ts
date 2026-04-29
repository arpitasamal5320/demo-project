import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('authToken');
  
    if (token) {
      const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  
      const cloned = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });
  
      return next.handle(cloned);
    }
  
    return next.handle(req);
  }
}