import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private session: SessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('authToken');

    const authReq = token ? req.clone({
      setHeaders: {
          Authorization: token.startsWith('Bearer ') ? token : 'Bearer ' + token
        }
    }) : req;
    
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.session.logout();
        }
        return throwError(() => error);
      })
    );
  }
}