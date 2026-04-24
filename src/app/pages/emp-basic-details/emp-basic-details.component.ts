import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-emp-basic-details',
  templateUrl: './emp-basic-details.component.html',
  styleUrls: ['./emp-basic-details.component.css']
})
export class EmpBasicDetailsComponent {

  empForm: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {

    this.empForm = this.fb.group({

      // ================= EMPLOYEE =================
      employee: this.fb.group({
        user_id: [''],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        phone: ['', Validators.required],
        date_of_birth: ['', Validators.required],
        gender: ['', Validators.required],
      }),

      // ================= EMPLOYEE DETAILS =================
      employeeDetails: this.fb.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['India'],
        pincode: ['', Validators.required],
        emergency_contact: ['', Validators.required],
        marital_status: ['', Validators.required],
        aadhar_no: ['', Validators.required],
        father_name: ['', Validators.required],
        mother_name: ['', Validators.required],
      }),

      // ================= JOB DETAILS =================
      jobDetails: this.fb.group({
        designation: ['', Validators.required],
        department: ['', Validators.required],
        salary: ['', Validators.required],
        joining_date: ['', Validators.required],
        employee_type: ['', Validators.required],
        status: ['ACTIVE'],
        skills: [''],
        prev_org: [''],
        experience_duration: ['', Validators.required]
      })

    });
  }

  // ================= SUBMIT =================
  onSubmit() {

    console.log('SUBMIT CLICKED');

    this.empForm.markAllAsTouched();

    if (this.empForm.invalid) {
      this.message = 'Please fill all required fields';
      return;
    }

    const formValue = this.empForm.value;

    // Convert comma-separated strings into arrays
    const payload = {
      ...formValue,
      jobDetails: {
        ...formValue.jobDetails,
        skills: formValue.jobDetails.skills
          ? formValue.jobDetails.skills.split(',').map((x: string) => x.trim())
          : [],

        prev_org: formValue.jobDetails.prev_org
          ? formValue.jobDetails.prev_org.split(',').map((x: string) => x.trim())
          : []
      }
    };

    console.log('FINAL PAYLOAD:', payload);

    // ✅ CALL BACKEND API
    this.employeeService.registerEmployee(payload).subscribe({
      next: (res) => {
        console.log('API SUCCESS:', res);
        this.message = 'Employee registered successfully';

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 800);
      },

      error: (err) => {
        console.error('API ERROR:', err);
        this.message = 'Failed to register employee';
      }
    });
  }
}