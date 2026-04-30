import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/core/services/attendance.service';

@Component({
  selector: 'app-attendance-mgmt',
  templateUrl: './attendance-mgmt.component.html',
  styleUrls: ['./attendance-mgmt.component.css']
})
export class AttendanceMgmtComponent implements OnInit{

  totalRecords: number = 0;
  totalPresent: number = 0;
  totalAbsent: number = 0;
  allAttendance: any[] = [];
  // totalLeaves: number = 0;
  // totalWFH: number = 0;

  displayedColumns: string[] = [
    'slNo',
    'date',
    'firstIn',
    'lastOut',
    'actualWorkTime',
    'status'
  ];

  selectedStatus: string = 'All Status';
  status: string[] = [
    'All Status',
    'Present',
    'Absent',
    // 'Leave',
    // 'WFH'
  ];

  dataSource: any[] = [];

  constructor(
    private attendanceService: AttendanceService
  ) { }
  
  ngOnInit(): void {
    this.loadAttendance(0,5);
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
          this.loadAttendance(0,5);
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
      this.loadAttendance(0,5);
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
    const offset =
      event.pageIndex * event.pageSize;
  
    const limit =
      event.pageSize;
  
    this.loadAttendance(offset, limit);
  }

  loadAttendance(offset: number, limit: number): void {
    const employeeId = localStorage.getItem('employeeId');
  
    if (!employeeId) return;
  
    this.attendanceService.getAttendance(employeeId, limit, offset)
      .subscribe(res => {

        this.totalRecords = res.data.length;
  
        const rows = res.data.map((item: any, index: number) => ({
              
              slNo: offset + index + 1,
  
              date: this.formatDate(item.date),
  
              firstIn: item.in_time ? this.formatTime(item.in_time) : '',
  
              lastOut: item.out_time ? this.formatTime(item.out_time) : '',
  
              actualWorkTime: item.in_time && item.out_time ? this.calculateWorkTime(item.in_time, item.out_time) : '',
  
              status: item.status === 1 ? 'Present' : item.status === 2 ? 'Leave' : item.status === 3 ? 'WFH' : 'Absent'
            })
        );
        
        this.totalPresent = res.data.filter((row: any) => row.status === 1).length;
        this.totalAbsent = res.data.filter((row: any) => row.status === 0).length;
        // this.totalLeave = res.data.filter((row: any) => row.status === 2).length;
        // this.totalWFH = res.data.filter((row: any) => row.status === 3).length;

        this.allAttendance = rows;
        this.dataSource = rows;
        this.addTodayRow();
      });
  }

  addTodayRow(): void {
    const today = this.getToday();
  
    const exists =
      this.dataSource.some(row => row.date === today);
  
    if (!exists) {
      this.dataSource.unshift({
        slNo: 1,
        date: today,
        firstIn: '',
        lastOut: '',
        actualWorkTime: 'NA',
        status: 'Absent'
      });
  
      this.totalRecords++;
    }
  }

  onStatusChange(): void{
    if (this.selectedStatus === 'All Status') this.dataSource = this.allAttendance; 
    else this.dataSource = this.allAttendance.filter(row => row.status === this.selectedStatus);
    this.totalRecords = this.dataSource.length;
  }

  // isWeekend(date: string): boolean{
  //   const day = new Date(date).getDay();
  //   return day === 0 || day === 6;
  // }
}