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
 
  constructor(private http: HttpClient) {}
 
  getEmployeeData(department: string, offset: number, limit: number) {
    return this.http.get(`${this.empDataFetchUrl}?department=${department}&offset=${offset}&limit=${limit}`);
  }
 
  registerEmployee(payload: any): Observable<any> {
    return this.http.post(this.empRegisterUrl, payload);
  }
}