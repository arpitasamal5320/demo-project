import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.css']
})
export class EmployeesDetailsComponent implements OnInit {

  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'designation',
    'emp_type',
    'gender',
    'joining_date',
    'phone',   // ✅ added
  'email'  
  ];

  dataSource: any[] = [];
  allEmployees: any[] = [];

  // 🔥 dynamic dropdown data
  departments: string[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const rawData = this.employeeService.getEmployeeData();
    const employees = rawData || [];

    // 🔥 flatten data
    this.allEmployees = employees.map((emp: any) => ({
      first_name: emp?.employee?.first_name ?? '',
      last_name: emp?.employee?.last_name ?? '',
      designation: emp?.jobDetails?.designation ?? '',
      emp_type: emp?.jobDetails?.employee_type ?? '',
      gender: emp?.employee?.gender ?? '',
      joining_date: emp?.jobDetails?.joining_date ?? '',
      department: emp?.jobDetails?.department ?? '',
      phone: emp?.employee?.phone ?? '',
  email: emp?.employee?.email ?? ''
    }));

    // initial table load
    this.dataSource = [...this.allEmployees];

    // 🔥 extract UNIQUE departments dynamically
    this.departments = [...new Set(
      this.allEmployees.map(emp => emp.department)
    )];
  }

  // 🔥 filtering function
  filterByDepartment(dept: string) {
    if (!dept || dept === 'ALL') {
      this.dataSource = [...this.allEmployees];
    } else {
      this.dataSource = this.allEmployees.filter(
        emp => emp.department === dept
      );
    }
  }
}