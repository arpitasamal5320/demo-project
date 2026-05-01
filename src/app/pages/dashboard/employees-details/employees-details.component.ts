import {
  AfterViewInit,
  ViewChild,
  Component,
  OnInit, Renderer2
} from '@angular/core';

import { EmployeeService } from 'src/app/core/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Chart } from 'chart.js/auto';

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
  chart:any;

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
  @ViewChild(MatSort) sort!: MatSort;

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
     this.loadChartData();
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadEmployees(offset: number, limit: number): void {
    console.log('done here');
    this.employeeService
      .getEmployeeData(this.selectedDepartment, offset, limit)
      .subscribe((result: any) => {

        const rows = (result.data || []).map((res: any) => ({
          name: `${res?.first_name ?? ''} ${res?.last_name ?? ''}`.trim(),
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
    console.log('done department');
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
    const diff = event.pageX - this.startX
    const newWidth = this.startWidth + diff;
    if (newWidth > 80) this.columnWidths[this.currentColumn] = newWidth;
  }

  stopResize = (): void => {
    localStorage.setItem('employeeColumnWidths', JSON.stringify(this.columnWidths));
    document.removeEventListener('mousemove', this.resizeColumn);
    document.removeEventListener('mouseup', this.stopResize);
  }

loadChartData(): void {
  this.employeeService.getAllEmployees().subscribe((result: any) => {

    const employees = result.data || [];
    const deptCount: any = {};

    employees.forEach((emp: any) => {
  const dept = emp?.jobDetails?.department;

  // ✅ FILTER departments here
  if (dept === 'IT' || dept === 'AI' || dept === 'WEBDEV'|| dept === 'BUSINESS'||dept === 'IOSDEV'||dept === 'IT'|| dept === 'MOBILEDEV') {
    deptCount[dept] = (deptCount[dept] || 0) + 1;
  }
});
    const labels = Object.keys(deptCount);
    const values = Object.values(deptCount) as number[];

    this.renderChart(labels, values);
  });
}

renderChart(labels: string[], data: number[]): void {
  if (this.chart) {
    this.chart.destroy();
  }

  this.chart = new Chart('deptChart', {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Employees per Department',
          data: data
        }
      ]
    },
    options: {
      responsive: true
    }
  });
}

}