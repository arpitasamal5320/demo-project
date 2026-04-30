import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/core/services/attendance.service';

@Component({
  selector: 'app-attendance-mgmt',
  templateUrl: './attendance-mgmt.component.html',
  styleUrls: ['./attendance-mgmt.component.css']
})
export class AttendanceMgmtComponent implements OnInit{

  pageSize: number = 0;
  pageIndex: number = 0;
  totalRecords: number = 0;

  displayedColumns: string[] = [
    'slNo',
    'date',
    'firstIn',
    'lastOut',
    'actualWorkTime',
    'status'
  ];

  dataSource: any[] = [
    // {
    //   slNo: 1,
    //   date: this.getToday(),
    //   firstIn: '',
    //   lastOut: '',
    //   actualWorkTime: ''
    // }
  ];

  constructor(
    private attendanceService: AttendanceService
  ) { }
  
  ngOnInit(): void {
    this.loadAttendance();
  }

  checkIn(): void {
    const employeeId = localStorage.getItem('employeeId');
  
    if (!employeeId) return;
    this.attendanceService.checkIn(employeeId)
      .subscribe({
        next: (res) => {
          if (res?.status === 'fail') {
            alert(res?.message);
            return;
          }
          this.loadAttendance();
        },
  
        error: (err) => {
          console.log(err);
          alert(err?.error?.message);
        }
      });
  }

  checkOut(): void {
    const employeeId = localStorage.getItem('employeeId');
    if (!employeeId) return;
  
    if (!this.dataSource[0]?.firstIn) {
      alert('Please check in first');
      return;
    }
    this.attendanceService.checkOut(employeeId)
  .subscribe({
    next: (res) => {
      if (res.status === 'fail') {
        alert(res?.message);
        return;
      }
      this.loadAttendance();
    },

    error: (err) => {
      console.log(err);
      alert(err?.error?.message);
    }
  });
  }

  calculateWorkTime(inTime: string, outTime: string): string {
    const inDate = new Date(inTime);
    const outDate = new Date(outTime);
  
    const minutes =
      (outDate.getTime() - inDate.getTime()) / 60000;
  
    if (minutes < 60) {
      return `${Math.floor(minutes)} mins`;
    }
  
    return `${(minutes / 60).toFixed(2)} hrs`;
  }

  getToday(): string {
    const d = new Date();
    const day = d.toLocaleDateString('en-US', { weekday: 'long' });
    const date = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${date}-${month}-${year} [${day}]`;
  }

  formatDate(date: string): string {
    const d = new Date(date);
  
    const day =
      d.toLocaleDateString('en-US', {
        weekday: 'long'
      });
  
    const dd =
      String(d.getDate()).padStart(2, '0');
  
    const mm =
      String(d.getMonth() + 1).padStart(2, '0');
  
    const yyyy =
      d.getFullYear();
  
    return `${dd}-${mm}-${yyyy} [${day}]`;
  }

  formatTime(time: string): string {
    return new Date(time).toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  
    this.loadAttendance();
  }

  loadAttendance(): void {
    const employeeId = localStorage.getItem('employeeId');
  
    if (!employeeId) return;
  
    const offset =
      this.pageIndex * this.pageSize;
  
    this.attendanceService.getAttendance(employeeId, this.pageSize, offset)
      .subscribe(res => {

        this.totalRecords = res.count || res.data.length;
  
        this.dataSource = res.data.map((item: any, index: number) => ({
              slNo: offset + index + 1,
  
              date: this.formatDate(item.date),
  
              firstIn: item.in_time ? this.formatTime(item.in_time) : 'NA',
  
              lastOut: item.out_time ? this.formatTime(item.out_time) : 'NA',
  
              actualWorkTime: item.in_time && item.out_time ? this.calculateWorkTime(item.in_time, item.out_time) : 'NA',
  
              status: item.status === 1 ? 'Present' : 'Absent'
            })
          );
  
        this.addTodayRow();
      });
  }

  addTodayRow(): void {
    const today = new Date().toISOString().split('T')[0];
  
    const exists = this.dataSource.some(x => x.date.includes(today.split('-')[2]));
  
    if (!exists) {
      this.dataSource.unshift({
        slNo: 1,
        date: this.getToday(),
        firstIn: '',
        lastOut: '',
        actualWorkTime: 'NA',
        status: 'Absent'
      });
    }
  }
}