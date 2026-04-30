import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  checkIn(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}employeeservice/check-in/${id}`,{});
  }

  checkOut(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}employeeservice/check-out/${id}`,{});
  }

  getAttendance(id: string, limit: number, offset: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/employeeservice/attendance/${id}?limit=${limit}&offset=${offset}`);
  }
}