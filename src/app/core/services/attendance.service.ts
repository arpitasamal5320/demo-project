import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private baseUrl = `${environment.apiUrl}/employeeservice`;

  constructor(private http: HttpClient) {}

  checkIn(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/check-in/${id}`,{});
  }

  checkOut(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/check-out/${id}`,{});
  }
}