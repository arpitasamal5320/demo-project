import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private timer: any = null;

  constructor(private router: Router) { }
  
  startSession(token: string): void{
    localStorage.setItem('authToken', token);

    const expiresAt = this.getExpiryTime(token);
    if (!expiresAt || expiresAt < Date.now()) {
      this.logout();
      return;
    }
    this.clearTimer();
    this.timer = setTimeout(() => this.logout(), expiresAt - Date.now());
  }

  restoreSession(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return;
    }

    if (this.isExpired(token)) {
      this.logout();
      return;
    }

    this.startSession(token);
  }

  logout(): void {
    this.clearTimer();
    this.clearSession();
    this.router.navigate(['/login']);
  }

  clearSession(): void {
    localStorage.clear();
    document.cookie.split(';').forEach(cookie => {
      document.cookie =
        cookie.split('=')[0].trim() +
        '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
    });
  }

  isExpired(token: string): boolean{
    const expiresAt = this.getExpiryTime(token);
    return !expiresAt || expiresAt < Date.now();
  }

  private getExpiryTime(token: string): number | null{
    const payload = jwtDecode<{ exp?: number }>(token);
    const expiresAt = payload.exp ? payload.exp * 1000 : null;
    return expiresAt;
  }

  private clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
