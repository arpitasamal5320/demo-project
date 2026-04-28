import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const token = localStorage.getItem('authToken');
    const empId = localStorage.getItem('employeeId');
    
    // 1. If not logged in at all, go to login
    if (!token) {
      return this.router.parseUrl('/login');
    }
    
    // 2. If logged in but NO employee ID
    if (!empId) {
      // Allow them to visit the registration page so they can get an ID
      if (state.url === '/emp-basic-regis') {
        return true; 
      }
      // Otherwise, force them to the registration page
      return this.router.parseUrl('/emp-basic-regis');
    }
    
    // 3. If they HAVE an employee ID but try to visit registration again, push to dashboard
    if (empId && state.url === '/emp-basic-regis') {
       return this.router.parseUrl('/dashboard');
    }

    return true;
  }
}