import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // ✅ single correct endpoint
  private empRegisterUrl = `${environment.apiUrl}/employeeservice`;

  constructor(private http: HttpClient) {}

    getEmployeeData() {
    return [
      {
        employee: {
          first_name: "Crazy",
          last_name: "Verma",
          gender: "MALE"
        },
        jobDetails: {
          designation: "Backend Developer",
          employee_type: "FULLTIME",
          joining_date: "2025-01-10"
        }
      }
    ];
  }

  
  registerEmployee(payload: any): Observable<any> {

    const token = localStorage.getItem('authToken') || '';

    const headers = new HttpHeaders({
      Authorization: token.startsWith('Bearer')
        ? token
        : `Bearer ${token}`
    });

    return this.http.post(this.empRegisterUrl, payload, { headers });
  }
}