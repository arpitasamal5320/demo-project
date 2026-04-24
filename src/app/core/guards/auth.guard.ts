import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  
  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('authToken');
    if (token) return true;
    return this.router.parseUrl('/login');
  }
  
}
