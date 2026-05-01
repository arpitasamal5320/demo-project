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

  
  applyLeave(empId: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${empId}`, payload);
  }
  
  getLeavesByEmpId(empId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${empId}`);
  }
  getLeavesByStatus(status: 'PENDING' | 'APPROVED' | 'REJECTED'): Observable<any> {
    return this.http.get(`${this.baseUrl}?status=${status}`);
  }

  updateLeaveStatus(leaveId: string, status: 'APPROVED' | 'REJECTED'): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${leaveId}`, { status });
  }
  
}