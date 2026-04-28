import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const token = localStorage.getItem('authToken');
    
    const isRegistered = localStorage.getItem('isRegistered') === 'true';
    
    if (!token) {
      return this.router.parseUrl('/login');
    }
    
    if (!isRegistered) {
      if (state.url === '/emp-basic-regis') {
        return true; 
      }
      return this.router.parseUrl('/emp-basic-regis');
    }
    
    if (isRegistered && state.url === '/emp-basic-regis') {
       return this.router.parseUrl('/dashboard');
    }

    return true;
  }
}