import { Component, OnInit, OnDestroy } from '@angular/core';
import { clear } from 'console';
import { AttendanceService } from 'src/app/core/services/attendance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  dailyWorkTime = '0';
  private timerId: ReturnType<typeof setInterval> | null = null;
  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.loadDailyWorkTime();
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  loadDailyWorkTime(): void {
    const employeeId = localStorage.getItem('employeeId');
    if (!employeeId) return;

    this.attendanceService.getAttendance(employeeId, 1, 0).subscribe({
      next: (res: any) => {
        const item = res?.data?.[0];

        if (!item?.in_time) {
          this.dailyWorkTime = '0';
          return;
        }

        const updateTime = () => {
          this.dailyWorkTime = this.formatDailyDuration(item.in_time, item.out_time || undefined);
        };

        updateTime();

        if (this.timerId) {
          clearInterval(this.timerId);
          this.timerId = null;
        }

        if (!item.out_time) this.timerId = setInterval(updateTime, 60000);
      },
      error: () => {
        this.dailyWorkTime = '0';
      }
    });
  }

  private formatDailyDuration(start: string, end?: string): string {
    const startMs = new Date(start).getTime();
    const endMs = end ? new Date(end).getTime() : Date.now();

    if (isNaN(startMs) || isNaN(endMs)) return '0';

    const totalSeconds = Math.max(0, Math.floor((endMs - startMs) / 1000));

    if (totalSeconds < 60) {
      return `${totalSeconds} sec`;
    }

    const totalMinutes = Math.floor(totalSeconds / 60);
    if (totalMinutes < 60) {
      return `${totalMinutes} mins`;
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return minutes > 0 ? `${hours} hrs ${minutes} mins` : `${hours} hrs`;
  }
}
