import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private empRegisterUrl = `${environment.apiUrl}/employeeservice`;
  private empDataFetchUrl = `${environment.apiUrl}/employeeservice`;
  private empUpdateUrl = `${environment.apiUrl}/employeeservice`; // base URL

  constructor(private http: HttpClient) {}

  getEmployeeData(department: string, offset: number, limit: number) {
    return this.http.get(`${this.empDataFetchUrl}?department=${department}&offset=${offset}&limit=${limit}`);
  }
 
  registerEmployee(payload: any): Observable<any> {
    return this.http.post(this.empRegisterUrl, payload);
  }

  // ✅ NEW: UPDATE EMPLOYEE API
  updateEmployee(id: string, payload: any): Observable<any> {
    const token = localStorage.getItem('authToken') || '';

    const headers = new HttpHeaders({
      Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
    });

    return this.http.put(`${this.empUpdateUrl}/${id}`, payload, { headers });
  }

  // optional: GET SINGLE EMPLOYEE (for edit page)
  getEmployeeById(id: string): Observable<any> {
    return this.http.get(`${this.empDataFetchUrl}/${id}`);
  }
}