import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private empRegisterUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) {}

  registerEmployee(data: any): Observable<any> {
    return this.http.post(this.empRegisterUrl, data);
  }

}