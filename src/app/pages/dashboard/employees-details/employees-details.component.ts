import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employees-detail',
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
    'joining_date'
  ];

  dataSource: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const rawData = this.employeeService.getEmployeeData();

    const employees = rawData || [];

    this.dataSource = employees.map((emp: any) => ({
      first_name: emp?.employee?.first_name ?? '',
      last_name: emp?.employee?.last_name ?? '',
      designation: emp?.jobDetails?.designation ?? '',
      emp_type: emp?.jobDetails?.employee_type ?? '',
      gender: emp?.employee?.gender ?? '',
      joining_date: emp?.jobDetails?.joining_date ?? ''
    }));
  }
}