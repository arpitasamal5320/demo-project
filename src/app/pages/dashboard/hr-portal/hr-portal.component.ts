import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveService } from 'src/app/core/services/leave.service';

interface LeaveRequest {
  id: string; // ✅ leaveId (IMPORTANT)
  emp_id: string;
  from_date: string;
  to_date: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  slNo?: number;
}

@Component({
  selector: 'app-hr-portal',
  templateUrl: './hr-portal.component.html',
  styleUrls: ['./hr-portal.component.css']
})
export class HRPortalComponent implements OnInit {

  displayedColumns: string[] = [
    'slNo',
    'emp_id',
    'from_date',
    'to_date',
    'reason',
    'status',
    'action'
  ];

  dataSource = new MatTableDataSource<LeaveRequest>([]);

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.loadAllLeaves();
  }

  // ✅ LOAD ALL LEAVES (ALL STATUS)
  loadAllLeaves() {
    Promise.all([
      this.leaveService.getLeavesByStatus('PENDING').toPromise(),
      this.leaveService.getLeavesByStatus('APPROVED').toPromise(),
      this.leaveService.getLeavesByStatus('REJECTED').toPromise()
    ])
    .then((responses: any[]) => {
      const allData = [
        ...(responses[0]?.data || []),
        ...(responses[1]?.data || []),
        ...(responses[2]?.data || [])
      ];

      this.dataSource.data = allData.map((item: any, index: number) => ({
        ...item,
        slNo: index + 1
      }));
    })
    .catch(err => console.error('Error loading leaves:', err));
  }

  // ✅ APPROVE (USES LEAVE ID)
  approveLeave(leaveId: string) {
    this.leaveService.updateLeaveStatus(leaveId, 'APPROVED')
      .subscribe({
        next: () => this.loadAllLeaves(),
        error: (err) => console.error(err)
      });
  }

  // ✅ REJECT (USES LEAVE ID)
  rejectLeave(leaveId: string) {
    this.leaveService.updateLeaveStatus(leaveId, 'REJECTED')
      .subscribe({
        next: () => this.loadAllLeaves(),
        error: (err) => console.error(err)
      });
  }
}
