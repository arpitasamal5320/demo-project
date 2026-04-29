import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit, Renderer2
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

  columnWidths: any = {
    sl_no:100,
    name: 180,
    designation: 180,
    emp_type: 180,
    gender: 130,
    joining_date: 170,
    phone: 180,
    email: 250
  };

  currentColumn = '';
  startX = 0;
  startWidth = 0;

  displayedColumns: string[] = [
    'sl_no',
    'name',
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

  constructor(
    private employeeService: EmployeeService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const saved = localStorage.getItem('employeeColumnWidths');
    if (saved) this.columnWidths = JSON.parse(saved);

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

  startResize(event: MouseEvent, column: string): void {
    event.preventDefault();
    this.currentColumn = column;
    this.startX = event.pageX;
    this.startWidth = this.columnWidths[column];

    document.addEventListener('mousemove', this.resizeColumn);
    document.addEventListener('mouseup', this.stopResize);
  }

  resizeColumn = (event: MouseEvent): void => {
    const delta = event.pageX - this.startX
    const newWidth = this.startWidth + delta;
    if (newWidth > 80) this.columnWidths[this.currentColumn] = newWidth;
  }

  stopResize = (): void => {
    localStorage.setItem('employeeColumnWidths', JSON.stringify(this.columnWidths));
    document.removeEventListener('mousemove', this.resizeColumn);
    document.removeEventListener('mouseup', this.stopResize);
  }
}