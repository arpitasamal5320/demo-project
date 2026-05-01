import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveService } from 'src/app/core/services/leave.service';
<<<<<<< HEAD
import { NotificationService } from 'src/app/core/services/notification.service';
 
=======

>>>>>>> 78cbbc7d1928075200a0a3617758dc7d9ebb3ad3
interface LeaveRequest {
  id: string;
  emp_id: string;
  from_date: string;
  to_date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason: string;
  slNo?: number;
}
<<<<<<< HEAD
 
=======

>>>>>>> 78cbbc7d1928075200a0a3617758dc7d9ebb3ad3
@Component({
  selector: 'app-leave-mgmt',
  templateUrl: './leave-mgmt.component.html',
  styleUrls: ['./leave-mgmt.component.css']
})
export class LeaveMgmtComponent implements OnInit {
<<<<<<< HEAD
 
  leaveForm!: FormGroup;
 
=======

  leaveForm!: FormGroup;

  role: string = '';
  isHrOrAdmin: boolean = false;

>>>>>>> 78cbbc7d1928075200a0a3617758dc7d9ebb3ad3
  displayedColumns: string[] = [
    'slNo',
    'from_date',
    'to_date',
    'reason',
    'status'
<<<<<<< HEAD
  ];
 
  dataSource = new MatTableDataSource<LeaveRequest>([]);
 
  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private notify: NotificationService
  ) {}
 
  ngOnInit(): void {
    this.initForm();
    this.loadLeaves();
  }
 
=======
    // ✅ NEW COLUMN
  ];

  dataSource = new MatTableDataSource<LeaveRequest>([]);

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {
    this.initForm();

    // ✅ GET ROLE FROM LOCAL STORAGE
    this.role = localStorage.getItem('role') || '';

    const normalizedRole = this.role.toUpperCase().replace('ROLE_', '');

    this.isHrOrAdmin =
      normalizedRole === 'HR' || normalizedRole === 'ADMIN';

    this.loadLeaves();
  }

>>>>>>> 78cbbc7d1928075200a0a3617758dc7d9ebb3ad3
  initForm() {
    this.leaveForm = this.fb.group({
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }
<<<<<<< HEAD
 
  getEmpId(): string {
    return localStorage.getItem('employeeId') || '';
  }
 
  onSubmit() {
    console.log('BUTTON CLICKED');
 
    if (this.leaveForm.invalid) {
      console.log('Form Invalid');
      return;
    }
 
    const empId = this.getEmpId();
 
    if (!empId) {
      console.error('EMP ID NOT FOUND');
      return;
    }
 
=======

  getEmpId(): string {
    return localStorage.getItem('employeeId') || '';
  }

  onSubmit() {
    if (this.leaveForm.invalid) return;

    const empId = this.getEmpId();
    if (!empId) return;

>>>>>>> 78cbbc7d1928075200a0a3617758dc7d9ebb3ad3
    const payload = {
      from_date: this.formatDate(this.leaveForm.value.from_date),
      to_date: this.formatDate(this.leaveForm.value.to_date),
      reason: this.leaveForm.value.reason
    };
<<<<<<< HEAD
 
    console.log('EmpId:', empId);
    console.log('Payload:', payload);
 
    this.leaveService.applyLeave(empId, payload).subscribe({
      next: (res) => {
        console.log('Leave Applied Successfully:', res);
=======

    this.leaveService.applyLeave(empId, payload).subscribe({
      next: () => {
>>>>>>> 78cbbc7d1928075200a0a3617758dc7d9ebb3ad3
        this.leaveForm.reset();
        this.loadLeaves();
      },
      error: (err) => {
<<<<<<< HEAD
        this.notify.showError(err);
      }
    });
  }
 
  formatDate(date: any): string {
    if (!date) return '';
 
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
 
    return `${year}-${month}-${day}`;
  }
 
  loadLeaves() {
    const empId = this.getEmpId();
 
    if (!empId) {
      console.error('EMP ID NOT FOUND');
      return;
    }
 
    this.leaveService.getLeavesByEmpId(empId).subscribe({
      next: (res: any) => {
        const rows = (res.data || []).map((item: any, index: number) => ({
          ...item,
          slNo: index + 1
        }));
 
        this.dataSource.data = rows;
      },
      error: (err) => {
        console.error('Error loading leaves:', err?.error || err);
      }
    });
  }
=======
        alert(err?.error?.message || 'Leave error');
      }
    });
  }

  formatDate(date: any): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${('0'+(d.getMonth()+1)).slice(-2)}-${('0'+d.getDate()).slice(-2)}`;
  }

  loadLeaves() {
    const empId = this.getEmpId();
    if (!empId) return;

    this.leaveService.getLeavesByEmpId(empId).subscribe({
      next: (res: any) => {
        this.dataSource.data = (res.data || []).map((item: any, i: number) => ({
          ...item,
          slNo: i + 1
        }));
      }
    });
  }

  // ✅ APPROVE
  approveLeave(empId: string) {
    if (!this.isHrOrAdmin) {
      alert('Only HR or Admin can approve');
      return;
    }

    this.leaveService.updateLeaveStatus(empId, 'APPROVED')
      .subscribe(() => this.loadLeaves());
  }

  // ✅ REJECT
  rejectLeave(empId: string) {
    if (!this.isHrOrAdmin) {
      alert('Only HR or Admin can reject');
      return;
    }

    this.leaveService.updateLeaveStatus(empId, 'REJECTED')
      .subscribe(() => this.loadLeaves());
  }
>>>>>>> 78cbbc7d1928075200a0a3617758dc7d9ebb3ad3
}