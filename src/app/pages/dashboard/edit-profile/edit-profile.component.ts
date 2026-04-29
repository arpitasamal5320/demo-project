import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'] // ✅ added here
})
export class EditProfileComponent implements OnInit {

  editForm!: FormGroup;
  employeeId!: string;
  message = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    this.initForm();

    if (this.employeeId) {
      this.loadEmployee(this.employeeId);
    }
  }

  initForm() {
    this.editForm = this.fb.group({
      employee: this.fb.group({
        first_name: [''],
        last_name: [''],
        phone: [''],
        date_of_birth: [''],
        gender: ['']
      }),
      employeeDetails: this.fb.group({
        address: [''],
        city: [''],
        state: [''],
        country: [''],
        pincode: [''],
        emergency_contact: [''],
        aadhar_no: ['']
      }),
      jobDetails: this.fb.group({
        designation: [''],
        department: [''],
        salary: [0],
        joining_date: [''],
        experience_duration: [0],
        skills: ['']
      })
    });
  }

  loadEmployee(id: string) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (res: any) => {
        this.editForm.patchValue(res.data || res);
      },
      error: () => {
        this.message = 'Failed to load employee data';
      }
    });
  }

  onUpdate() {
    if (this.editForm.invalid) return;

    const payload = this.editForm.value;

    this.employeeService.updateEmployee(this.employeeId, payload).subscribe({
      next: () => {
        this.message = 'Profile updated successfully';
        this.router.navigate(['/employee']);
      },
      error: () => {
        this.message = 'Update failed';
      }
    });
  }
}