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
  private empUpdateUrl = `${environment.apiUrl}/employeeservice`;
 
  constructor(private http: HttpClient) {}
 
  getEmployeeData(department: string, offset: number, limit: number) {
    return this.http.get(`${this.empDataFetchUrl}?department=${department}&offset=${offset}&limit=${limit}`);
  }
 
  registerEmployee(payload: any): Observable<any> {
    return this.http.post(this.empRegisterUrl, payload);
  }

  updateEmployee(id: string, payload: any): Observable<any> {
    let result = this.http.put(`${this.empUpdateUrl}/${id}`, payload);
    if (!result) console.log("result not found")
    console.log(`This is result ${JSON.stringify(result)}`);
    return result;
  }
 
  getEmployeeById(id: string): Observable<any> {
    return this.http.get(`${this.empDataFetchUrl}/${id}`);
  }
}