import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/login`;
  private signupUrl = `${environment.apiUrl}/signup`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      email: email,
      password: password
    });
  }

  signUp(email: string, password: string, role: string): Observable<any> {
    return this.http.post(this.signupUrl, {
      email: email,
      password: password,
      role: role
    });
  }
}