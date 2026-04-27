import { HttpClient } from '@angular/common/http';
<<<<<<< Updated upstream
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

=======
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
>>>>>>> Stashed changes
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

<<<<<<< HEAD
  private empRegisterUrl = `${environment.apiUrl}/employees`;
=======
<<<<<<< Updated upstream
  private baseUrl = 'https://maritime-button-orchestra-within.trycloudflare.com';
>>>>>>> fbcfefc (API + dashboard feature changes)

  constructor(private http: HttpClient) {}

  registerEmployee(data: any): Observable<any> {
    return this.http.post(this.empRegisterUrl, data);
  }
=======
  constructor(private http: HttpClient) {}

  registerEmployee(payload: any) {
    const token = localStorage.getItem('authToken') || '';
>>>>>>> Stashed changes

    return this.http.post(
      `${environment.apiUrl}/employeeservice`,
      payload,
      {
        headers: {
          Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
        }
      }
    );
  }
}