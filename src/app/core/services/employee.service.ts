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
  private empDataFetchUrl = `${environment.apiUrl}/employeeservice`;
 
  constructor(private http: HttpClient) {}
 
  getEmployeeData(department: string, offset: number, limit: number) {
    return this.http.get(`${this.empDataFetchUrl}?department=${department}&offset=${offset}&limit=${limit}`)
  // return [
 
  //   // 🔵 BUSINESS (5)
  //   {
  //     employee: { first_name: "Amit", last_name: "Sharma", gender: "MALE", phone: "9000000001", email: "amit.sharma@gmail.com" },
  //     jobDetails: { designation: "Business Analyst", employee_type: "FULLTIME", joining_date: "2024-03-15", department: "BUSINESS" }
  //   },
  //   {
  //     employee: { first_name: "Rohit", last_name: "Agarwal", gender: "MALE", phone: "9000000002", email: "rohit.agarwal@gmail.com" },
  //     jobDetails: { designation: "Consultant", employee_type: "FULLTIME", joining_date: "2023-01-10", department: "BUSINESS" }
  //   },
  //   {
  //     employee: { first_name: "Pooja", last_name: "Jain", gender: "FEMALE", phone: "9000000003", email: "pooja.jain@gmail.com" },
  //     jobDetails: { designation: "Manager", employee_type: "FULLTIME", joining_date: "2022-07-20", department: "BUSINESS" }
  //   },
  //   {
  //     employee: { first_name: "Karan", last_name: "Malhotra", gender: "MALE", phone: "9000000004", email: "karan.m@gmail.com" },
  //     jobDetails: { designation: "Executive", employee_type: "CONTRACT", joining_date: "2025-02-01", department: "BUSINESS" }
  //   },
  //   {
  //     employee: { first_name: "Anita", last_name: "Kapoor", gender: "FEMALE", phone: "9000000005", email: "anita.k@gmail.com" },
  //     jobDetails: { designation: "Analyst", employee_type: "FULLTIME", joining_date: "2023-09-12", department: "BUSINESS" }
  //   },
 
  //   // 🟢 IT (5)
  //   {
  //     employee: { first_name: "Neha", last_name: "Verma", gender: "FEMALE", phone: "9000000011", email: "neha.verma@gmail.com" },
  //     jobDetails: { designation: "System Engineer", employee_type: "FULLTIME", joining_date: "2023-07-10", department: "IT" }
  //   },
  //   {
  //     employee: { first_name: "Arjun", last_name: "Reddy", gender: "MALE", phone: "9000000012", email: "arjun.r@gmail.com" },
  //     jobDetails: { designation: "DevOps Engineer", employee_type: "FULLTIME", joining_date: "2022-05-11", department: "IT" }
  //   },
  //   {
  //     employee: { first_name: "Meena", last_name: "Iyer", gender: "FEMALE", phone: "9000000013", email: "meena.i@gmail.com" },
  //     jobDetails: { designation: "QA Engineer", employee_type: "FULLTIME", joining_date: "2024-01-25", department: "IT" }
  //   },
  //   {
  //     employee: { first_name: "Suresh", last_name: "Patil", gender: "MALE", phone: "9000000014", email: "suresh.p@gmail.com" },
  //     jobDetails: { designation: "Support Engineer", employee_type: "CONTRACT", joining_date: "2025-03-18", department: "IT" }
  //   },
  //   {
  //     employee: { first_name: "Divya", last_name: "Nair", gender: "FEMALE", phone: "9000000015", email: "divya.n@gmail.com" },
  //     jobDetails: { designation: "Cloud Engineer", employee_type: "FULLTIME", joining_date: "2023-11-09", department: "IT" }
  //   },
 
  //   // 🟡 AI (5)
  //   {
  //     employee: { first_name: "Sneha", last_name: "Roy", gender: "FEMALE", phone: "9000000021", email: "sneha.roy@gmail.com" },
  //     jobDetails: { designation: "ML Engineer", employee_type: "FULLTIME", joining_date: "2024-11-05", department: "AI" }
  //   },
  //   {
  //     employee: { first_name: "Ravi", last_name: "Kumar", gender: "MALE", phone: "9000000022", email: "ravi.k@gmail.com" },
  //     jobDetails: { designation: "Data Scientist", employee_type: "FULLTIME", joining_date: "2022-08-19", department: "AI" }
  //   },
  //   {
  //     employee: { first_name: "Shreya", last_name: "Sen", gender: "FEMALE", phone: "9000000023", email: "shreya.s@gmail.com" },
  //     jobDetails: { designation: "AI Analyst", employee_type: "FULLTIME", joining_date: "2023-04-14", department: "AI" }
  //   },
  //   {
  //     employee: { first_name: "Manish", last_name: "Yadav", gender: "MALE", phone: "9000000024", email: "manish.y@gmail.com" },
  //     jobDetails: { designation: "NLP Engineer", employee_type: "CONTRACT", joining_date: "2025-01-02", department: "AI" }
  //   },
  //   {
  //     employee: { first_name: "Priyanka", last_name: "Das", gender: "FEMALE", phone: "9000000025", email: "priyanka.d@gmail.com" },
  //     jobDetails: { designation: "Researcher", employee_type: "FULLTIME", joining_date: "2023-06-30", department: "AI" }
  //   },
 
  //   // 🟣 MOBILEDEV (5)
  //   {
  //     employee: { first_name: "Vikram", last_name: "Singh", gender: "MALE", phone: "9000000031", email: "vikram.s@gmail.com" },
  //     jobDetails: { designation: "Android Developer", employee_type: "FULLTIME", joining_date: "2022-09-18", department: "MOBILEDEV" }
  //   },
  //   {
  //     employee: { first_name: "Ajay", last_name: "Gupta", gender: "MALE", phone: "9000000032", email: "ajay.g@gmail.com" },
  //     jobDetails: { designation: "Flutter Dev", employee_type: "FULLTIME", joining_date: "2023-02-12", department: "MOBILEDEV" }
  //   },
  //   {
  //     employee: { first_name: "Komal", last_name: "Shah", gender: "FEMALE", phone: "9000000033", email: "komal.s@gmail.com" },
  //     jobDetails: { designation: "React Native Dev", employee_type: "FULLTIME", joining_date: "2024-05-20", department: "MOBILEDEV" }
  //   },
  //   {
  //     employee: { first_name: "Nitin", last_name: "Joshi", gender: "MALE", phone: "9000000034", email: "nitin.j@gmail.com" },
  //     jobDetails: { designation: "Android Tester", employee_type: "CONTRACT", joining_date: "2025-01-11", department: "MOBILEDEV" }
  //   },
  //   {
  //     employee: { first_name: "Ritika", last_name: "Saxena", gender: "FEMALE", phone: "9000000035", email: "ritika.s@gmail.com" },
  //     jobDetails: { designation: "Mobile UI Dev", employee_type: "FULLTIME", joining_date: "2023-08-08", department: "MOBILEDEV" }
  //   },
 
  //   // 🔴 IOSDEV (5)
  //   {
  //     employee: { first_name: "Priya", last_name: "Mehta", gender: "FEMALE", phone: "9000000041", email: "priya.mehta@gmail.com" },
  //     jobDetails: { designation: "iOS Developer", employee_type: "FULLTIME", joining_date: "2023-05-25", department: "IOSDEV" }
  //   },
  //   {
  //     employee: { first_name: "Kunal", last_name: "Bansal", gender: "MALE", phone: "9000000042", email: "kunal.b@gmail.com" },
  //     jobDetails: { designation: "Swift Dev", employee_type: "FULLTIME", joining_date: "2022-11-30", department: "IOSDEV" }
  //   },
  //   {
  //     employee: { first_name: "Isha", last_name: "Khanna", gender: "FEMALE", phone: "9000000043", email: "isha.k@gmail.com" },
  //     jobDetails: { designation: "iOS Tester", employee_type: "FULLTIME", joining_date: "2024-07-19", department: "IOSDEV" }
  //   },
  //   {
  //     employee: { first_name: "Rahul", last_name: "Chopra", gender: "MALE", phone: "9000000044", email: "rahul.c@gmail.com" },
  //     jobDetails: { designation: "Objective-C Dev", employee_type: "CONTRACT", joining_date: "2025-03-03", department: "IOSDEV" }
  //   },
  //   {
  //     employee: { first_name: "Neelam", last_name: "Arora", gender: "FEMALE", phone: "9000000045", email: "neelam.a@gmail.com" },
  //     jobDetails: { designation: "iOS UI Dev", employee_type: "FULLTIME", joining_date: "2023-10-15", department: "IOSDEV" }
  //   }
 
  // ];
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