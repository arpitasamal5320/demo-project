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

      // employee details
      employee: this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        phone: ['', [Validators.required, PhoneValidator]],
        date_of_birth: ['', Validators.required],
        gender: ['', Validators.required],
      }),

      // employee's personal details
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

      // job details
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

    console.log('SUBMIT CLICKED');

    this.empForm.markAllAsTouched();

    if (this.empForm.invalid) {
      this.message = 'Please fill all required fields';
      return;
    }

    const formValue = this.empForm.value;

    // conversion of comma separated values into array
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

    this.employeeService.registerEmployee(payload).subscribe({
      next: (res: any) => {
        console.log('================ SUCCESS RESPONSE ================');
        console.log('Response:', res);
        console.log('Message:', res?.message);
        console.log('Full Response:', JSON.stringify(res, null, 2));

        this.message = res?.message || 'Employee registered successfully';

        const empId = res.data.employee.id;
        localStorage.setItem('employeeId', empId);
        localStorage.setItem('isRegistred', 'true');

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 800);
      },

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
  }
}