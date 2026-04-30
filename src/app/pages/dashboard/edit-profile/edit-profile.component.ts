import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm!: FormGroup;
  message = '';
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.userId = localStorage.getItem('userId') || '';

    if (!this.userId) {
      this.message = 'Employee ID not found';
      return;
    }

    this.loadEmployeeData();
  }

  // ---------------- FORM ----------------
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
        marital_status: [''],
        aadhar_no: [''],
        father_name: [''],
        mother_name: ['']
      }),
      jobDetails: this.fb.group({
        designation: [''],
        department: [''],
        employee_type: [''],
        salary: [''],
        joining_date: [''],
        experience_duration: [''],
        skills: [''],
        prev_org: ['']
      })
    });
  }

  // ---------------- LOAD DATA ----------------
  loadEmployeeData() {
    this.empService.getEmployeeById(this.userId).subscribe({
      next: (res: any) => {

        const data = res.data;

        // update correct ID from backend
        this.userId = data.employee.id;

        this.editForm.patchValue({
          employee: {
            ...data.employee,
            date_of_birth: this.formatDate(data.employee.date_of_birth)
          },
          employeeDetails: data.employeeDetails,
          jobDetails: {
            ...data.jobDetails,
            joining_date: this.formatDate(data.jobDetails.joining_date),

            // array → string for UI
            skills: data.jobDetails.skills?.join(', '),

            prev_org: data.jobDetails.prev_org
              ?.map((x: any) => x.company)
              .join(', ')
          }
        });
      }
    });
  }

  // ---------------- DATE FORMAT ----------------
  formatDate(date: string) {
    return date ? date.split('T')[0] : '';
  }

  // ---------------- UPDATE ----------------
  onUpdate() {

    const form = this.editForm.value;

    // ✅ FINAL STRUCTURE EXACTLY MATCHING BACKEND
    const payload = {
      employee: {
        ...form.employee
      },

      employeeDetails: {
        ...form.employeeDetails
      },

      jobDetails: {
        ...form.jobDetails,

        // string → array
        skills: form.jobDetails.skills
          ? form.jobDetails.skills.split(',').map((s: string) => s.trim())
          : [],

        prev_org: form.jobDetails.prev_org
          ? form.jobDetails.prev_org.split(',').map((c: string) => ({
              company: c.trim(),
              years: 0
            }))
          : []
      }
    };

    console.log("FINAL PAYLOAD →", payload);

    this.empService.updateEmployee(this.userId, payload).subscribe({
      next: () => {
        this.message = 'Profile updated successfully';
        this.loadEmployeeData();
      },
      error: (err) => {
        console.error(err);
        this.message = err.error?.message || 'Update failed';
      }
    });
  }
}