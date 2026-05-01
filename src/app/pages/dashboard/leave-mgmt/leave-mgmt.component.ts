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
 
  displayedColumns: string[] = [
    'slNo',
    'from_date',
    'to_date',
    'reason',
    'status'
  ];
 
  dataSource = new MatTableDataSource<LeaveRequest>([]);
 
  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService
  ) {}
 
  ngOnInit(): void {
    this.initForm();
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
 
    const payload = {
      from_date: this.formatDate(this.leaveForm.value.from_date),
      to_date: this.formatDate(this.leaveForm.value.to_date),
      reason: this.leaveForm.value.reason
    };
 
    console.log('EmpId:', empId);
    console.log('Payload:', payload);
 
    this.leaveService.applyLeave(empId, payload).subscribe({
      next: (res) => {
        console.log('Leave Applied Successfully:', res);
        this.leaveForm.reset();
        this.loadLeaves();
      },
      error: (err) => {
        const message = err?.error?.message || 'Leave overlaps with existing request';
  alert(message);
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
}