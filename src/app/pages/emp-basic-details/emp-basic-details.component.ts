import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/employee.service';
<<<<<<< HEAD
import { AadharValidator } from 'src/app/core/validators/aadhar.validator';
import { PhoneValidator } from 'src/app/core/validators/phone.validator';
import { SalaryValidator } from 'src/app/core/validators/salary.validator';
=======
<<<<<<< Updated upstream
=======
import { AadharValidator } from 'src/app/core/validators/aadhar.validator';
import { PhoneValidator } from 'src/app/core/validators/phone.validator';
import { SalaryValidator } from 'src/app/core/validators/salary.validator';
import { debounceTime } from 'rxjs';
>>>>>>> Stashed changes
>>>>>>> fbcfefc (API + dashboard feature changes)

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

<<<<<<< HEAD
      // employee details
=======
<<<<<<< Updated upstream
      // ================= EMPLOYEE =================
=======
>>>>>>> Stashed changes
>>>>>>> fbcfefc (API + dashboard feature changes)
      employee: this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        phone: ['', [Validators.required, PhoneValidator]],
        date_of_birth: ['', Validators.required],
        gender: ['', Validators.required],
      }),

<<<<<<< HEAD
      // employee's personal details
=======
<<<<<<< Updated upstream
      // ================= EMPLOYEE DETAILS =================
=======
>>>>>>> Stashed changes
>>>>>>> fbcfefc (API + dashboard feature changes)
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

<<<<<<< HEAD
      // job details
=======
<<<<<<< Updated upstream
      // ================= JOB DETAILS =================
=======
>>>>>>> Stashed changes
>>>>>>> fbcfefc (API + dashboard feature changes)
      jobDetails: this.fb.group({
        designation: ['', Validators.required],
        department: ['', Validators.required],
        salary: ['', [Validators.required, SalaryValidator]],
        joining_date: ['', Validators.required],
        employee_type: ['', Validators.required],
        status: ['ACTIVE'],

        // ✅ STRING INPUT (textarea)
        skills: [''],

        // ✅ STRING INPUT (textarea) — FIXED COMMA ISSUE HERE
        prev_org: [''],

        experience_duration: ['', Validators.required]
      })

    });
  }

<<<<<<< HEAD
=======
<<<<<<< Updated upstream
  // ================= SUBMIT =================
=======
 
>>>>>>> Stashed changes
>>>>>>> fbcfefc (API + dashboard feature changes)
  onSubmit() {

    console.log('SUBMIT CLICKED');

    this.empForm.markAllAsTouched();

    if (this.empForm.invalid) {
      this.message = 'Please fill all required fields';
      return;
    }

    const formValue = this.empForm.value;

<<<<<<< HEAD
    // conversion of comma separated values into array
=======
<<<<<<< Updated upstream
    // Convert comma-separated strings into arrays
=======
    // ✅ FINAL PAYLOAD (matches backend EXACTLY)
>>>>>>> Stashed changes
>>>>>>> fbcfefc (API + dashboard feature changes)
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

        // ✅ required field
        past_experience: !!formValue.jobDetails.prev_org,

        // ✅ STRING → ARRAY OF OBJECTS
        prev_org: formValue.jobDetails.prev_org
          ? formValue.jobDetails.prev_org.split(',').map((x: string) => ({
              company: x.trim(),
              years: 0
            }))
          : [],

        // ✅ STRING → ARRAY
        skills: formValue.jobDetails.skills
          ? formValue.jobDetails.skills.split(',').map((x: string) => x.trim())
          : [],

        experience_duration: Number(formValue.jobDetails.experience_duration)
      }
    };

    const token = localStorage.getItem('authToken') || '';

<<<<<<< Updated upstream
    this.employeeService.registerEmployee(payload).subscribe({
      next: (res: any) => {
        console.log('================ SUCCESS RESPONSE ================');
        console.log('Response:', res);
        console.log('Message:', res?.message);
        console.log('Full Response:', JSON.stringify(res, null, 2));

<<<<<<< HEAD
        this.message = res?.message || 'Employee registered successfully';
=======
    this.message = res?.message || 'Employee registered successfully';
=======
    const payloadWithToken = {
      ...payload,
      token
    };

    console.log('FINAL PAYLOAD:', payloadWithToken);

    this.employeeService.registerEmployee(payloadWithToken).subscribe({
      next: (res: any) => {
        this.message = res?.message || 'Employee registered successfully';
>>>>>>> Stashed changes
>>>>>>> fbcfefc (API + dashboard feature changes)

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 800);
      },

<<<<<<< HEAD
      error: (err) => {
        console.log('================ ERROR RESPONSE ================');
        console.log('Status:', err.status);
        console.log('Error Body:', err.error);
        console.log('Backend Message:', err.error?.message);

=======
<<<<<<< Updated upstream
  error: (err) => {
    console.log('================ ERROR RESPONSE ================');
    console.log('Status:', err.status);
    console.log('Error Body:', err.error);
    console.log('Backend Message:', err.error?.message);

    if (err.status === 409) {
      this.message = 'Employee already exists (duplicate entry)';
    } else {
      this.message = err.error?.message || 'Failed to register employee';
    }
  }
});
=======
      error: (err) => {
>>>>>>> fbcfefc (API + dashboard feature changes)
        if (err.status === 409) {
          this.message = 'Employee already exists (duplicate entry)';
        } else {
          this.message = err.error?.message || 'Failed to register employee';
        }
      }
    });
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> fbcfefc (API + dashboard feature changes)
  }
}