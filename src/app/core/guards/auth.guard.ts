import { Injectable } from '@angular/core';
// Router for navigation
// canActivate interface for router protection
// UrlTree represents redirect path
// ActivatedRouteSnapshot for current route details
// RouterStateSnapshot for current URL details
import { Router, CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';

// marks class as injectable service
@Injectable({
  // makes one global object for whole app, usable everywhere
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // runs when object for AuthGuard class is created, Angular injects router object
  constructor(
    private router: Router,
    private session: SessionService
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const token = localStorage.getItem('authToken');

    if (!token || this.session.isExpired(token)) {
      this.session.clearSession();
      return this.router.parseUrl('/login');
    }
    
    const isRegistered = localStorage.getItem('isRegistered') === 'true';
    
    if (!isRegistered) {
      if (state.url === '/emp-basic-regis') {
        return true; 
      }
      return this.router.parseUrl('/emp-basic-regis');
    }
    
    if (isRegistered && state.url.includes('/emp-basic-regis')) {
       return this.router.parseUrl('/dashboard');
    }

    return true;
  }
}