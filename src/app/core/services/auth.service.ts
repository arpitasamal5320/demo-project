import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/login`;
  private signupUrl = `${environment.apiUrl}/signup`;
  private formHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post(this.apiUrl, body.toString(), {
      headers: this.formHeaders
    });
  }

  signUp(email: string, password: string, role: string): Observable<any> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password)
      .set('role', role);

    return this.http.post(this.signupUrl, body.toString(), {
      headers: this.formHeaders
    });
  }
}