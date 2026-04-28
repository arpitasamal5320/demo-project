import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  
  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('authToken');
    const empId = localStorage.getItem('employeeId');
    if (!token) return this.router.parseUrl('/login');
    if (!empId) return this.router.parseUrl('/emp-basic-regis');
    return true;
  }
  
}
