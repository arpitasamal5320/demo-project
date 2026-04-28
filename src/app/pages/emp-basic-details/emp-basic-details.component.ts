import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/employee.service';

import { AadharValidator } from 'src/app/core/validators/aadhar.validator';
import { PhoneValidator } from 'src/app/core/validators/phone.validator';
import { SalaryValidator } from 'src/app/core/validators/salary.validator';

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

      employee: this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        phone: ['', [Validators.required, PhoneValidator]],
        date_of_birth: ['', Validators.required],
        gender: ['', Validators.required],
      }),

      employeeDetails: this.fb.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['India'],
        pincode: ['', Validators.required],
        emergency_contact: ['', [Validators.required, PhoneValidator]],
        marital_status: ['', Validators.required],
        aadhar_no: ['', [Validators.required, AadharValidator]],
        father_name: ['', Validators.required],
        mother_name: ['', Validators.required],
      }),

      jobDetails: this.fb.group({
        designation: ['', Validators.required],
        department: ['', Validators.required],
        salary: ['', [Validators.required, SalaryValidator]],
        joining_date: ['', Validators.required],
        employee_type: ['', Validators.required],
        status: ['ACTIVE'],

        skills: [''],
        prev_org: [''],
        experience_duration: ['', Validators.required]
      })

    });
  }

  onSubmit() {

    this.empForm.markAllAsTouched();

    if (this.empForm.invalid) {
      this.message = 'Please fill all required fields';
      return;
    }

    const formValue = this.empForm.value;

    // ✅ FINAL PAYLOAD (CLEAN)
    const payload = {
      employee: formValue.employee,
      employeeDetails: formValue.employeeDetails,

      jobDetails: {
        designation: formValue.jobDetails.designation,
        department: formValue.jobDetails.department,
        salary: Number(formValue.jobDetails.salary),
        joining_date: formValue.jobDetails.joining_date,
        employee_type: formValue.jobDetails.employee_type,
        status: formValue.jobDetails.status,

        past_experience: !!formValue.jobDetails.prev_org,

        // string → array of objects
        prev_org: formValue.jobDetails.prev_org
          ? formValue.jobDetails.prev_org.split(',').map((x: string) => ({
              company: x.trim(),
              years: 0
            }))
          : [],

        // string → array
        skills: formValue.jobDetails.skills
          ? formValue.jobDetails.skills.split(',').map((x: string) => x.trim())
          : [],

        experience_duration: Number(formValue.jobDetails.experience_duration)
      }
    };

    const token = localStorage.getItem('authToken') || '';

    console.log('FINAL PAYLOAD:', payload);

    // ✅ SINGLE API CALL ONLY (FIXED)
    this.employeeService.registerEmployee(payload).subscribe({
      next: (res: any) => {

        console.log('SUCCESS RESPONSE:', res);

        this.message = res?.message || 'Employee registered successfully';

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 800);
      },

      error: (err) => {

        console.log('ERROR RESPONSE:', err);

        if (err.status === 409) {
          this.message = 'Employee already exists (duplicate entry)';
        } else {
          this.message = err.error?.message || 'Failed to register employee';
        }
      }
    });
  }
}