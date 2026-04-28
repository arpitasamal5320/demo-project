import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit
} from '@angular/core';

import { EmployeeService } from 'src/app/core/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.css']
})
export class EmployeesDetailsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'sl_no',
    'first_name',
    'last_name',
    'designation',
    'emp_type',
    'gender',
    'joining_date',
    'phone',
    'email'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>([]);
  departments: string[] = [
    'BUSINESS',
    'IT',
    'WEBDEV',
    'AI',
    'MOBILEDEV',
    'IOSDEV'
  ];
  selectedDepartment = 'ALL';
  totalRecords = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees(0, 5);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadEmployees(offset: number, limit: number): void {
    this.employeeService
      .getEmployeeData(this.selectedDepartment, offset, limit)
      .subscribe((result: any) => {

        const rows = (result.data || []).map((res: any) => ({
          first_name: res?.first_name ?? '',
          last_name: res?.last_name ?? '',
          designation: res?.jobDetails?.designation ?? '',
          emp_type: res?.jobDetails?.employee_type ?? '',
          gender: res?.gender ?? '',
          joining_date: res?.jobDetails?.joining_date ?? '',
          department: res?.jobDetails?.department ?? '',
          phone: res?.phone ?? '',
          email: res?.additionalInfo?.email ?? ''
        }));

        this.dataSource.data = rows;
        this.totalRecords = rows.length;
      });
  }

  filterByDepartment(dept: string): void {
    this.selectedDepartment = dept;

    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.loadEmployees(0, 5);
  }

  onPageChange(event: any): void {
    const offset = event.pageIndex * event.pageSize;
    const limit = event.pageSize;

    this.loadEmployees(offset, limit);
  }
}