

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private baseUrl = `${environment.apiUrl}/leaveservice`;

  constructor(private http: HttpClient) {}

  // ✅ APPLY LEAVE
  applyLeave(empId: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${empId}`, payload);
  }

  // ✅ GET ALL LEAVES BY EMPLOYEE
  getLeavesByEmpId(empId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${empId}`);
  }
}