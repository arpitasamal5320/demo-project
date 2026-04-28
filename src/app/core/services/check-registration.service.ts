import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckRegistrationService {

  constructor(private http: HttpClient) { }
  private checkRegistrationUrl = `${environment.apiUrl}/employeeservice/isRegistered`; 

  checkRegistrationStatus(): Observable<any> {
    return this.http.get(this.checkRegistrationUrl);
  }
}
