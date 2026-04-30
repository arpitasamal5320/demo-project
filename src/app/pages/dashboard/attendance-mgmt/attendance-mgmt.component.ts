import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/core/services/attendance.service';

@Component({
  selector: 'app-attendance-mgmt',
  templateUrl: './attendance-mgmt.component.html',
  styleUrls: ['./attendance-mgmt.component.css']
})
export class AttendanceMgmtComponent {

  displayedColumns: string[] = [
    'slNo',
    'date',
    'firstIn',
    'lastOut',
    'actualWorkTime'
  ];

  dataSource: any[] = [
    {
      slNo: 1,
      date: this.getToday(),
      firstIn: '',
      lastOut: '',
      actualWorkTime: ''
    }
  ];

  constructor(
    private attendanceService: AttendanceService
  ) {}

  checkIn(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
  
    this.attendanceService.checkIn(userId)
      .subscribe(res => {
        this.dataSource[0].firstIn = res.data.in_time;
      });
  }

  checkOut(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
  
    if (!this.dataSource[0].firstIn) {
      alert('Please check in first');
      return;
    }
  
    this.attendanceService.checkOut(userId)
  .subscribe({
    next: (res) => {
      this.dataSource[0].lastOut = res?.data?.out_time;

      this.dataSource[0].actualWorkTime =
        this.calculateWorkTime(
          this.dataSource[0].firstIn,
          res.data.out_time
        );
    },

    error: (err) => {
      alert(err.error.message);
    }
  });
  }

  calculateWorkTime(inTime: string, outTime: string): string {
    const inDate = new Date(`1970-01-01 ${inTime}`);
    const outDate = new Date(`1970-01-01 ${outTime}`);
  
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
}