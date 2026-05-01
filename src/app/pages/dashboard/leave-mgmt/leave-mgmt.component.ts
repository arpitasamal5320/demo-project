import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveService } from 'src/app/core/services/leave.service';

interface LeaveRequest {
  id: string;
  emp_id: string;
  from_date: string;
  to_date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason: string;
  slNo?: number;
}

@Component({
  selector: 'app-leave-mgmt',
  templateUrl: './leave-mgmt.component.html',
  styleUrls: ['./leave-mgmt.component.css']
})
export class LeaveMgmtComponent implements OnInit {

  leaveForm!: FormGroup;

  role: string = '';
  isHrOrAdmin: boolean = false;

  displayedColumns: string[] = [
    'slNo',
    'from_date',
    'to_date',
    'reason',
    'status'
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

  initForm() {
    this.leaveForm = this.fb.group({
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  getEmpId(): string {
    return localStorage.getItem('employeeId') || '';
  }

  onSubmit() {
    if (this.leaveForm.invalid) return;

    const empId = this.getEmpId();
    if (!empId) return;

    const payload = {
      from_date: this.formatDate(this.leaveForm.value.from_date),
      to_date: this.formatDate(this.leaveForm.value.to_date),
      reason: this.leaveForm.value.reason
    };

    this.leaveService.applyLeave(empId, payload).subscribe({
      next: () => {
        this.leaveForm.reset();
        this.loadLeaves();
      },
      error: (err) => {
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
}