import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/employee.service';
<<<<<<< HEAD

=======
 
>>>>>>> 332a3023466cb03445ef25d72808d230e2eb9ca9
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
<<<<<<< HEAD

  editForm!: FormGroup;
  message = '';
  userId!: string;

=======
 
  editForm!: FormGroup;
  message = '';
  employeeId!: string;
 
>>>>>>> 332a3023466cb03445ef25d72808d230e2eb9ca9
  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService
  ) {}
<<<<<<< HEAD

  ngOnInit(): void {
    this.initForm();

    this.userId = localStorage.getItem('userId') || '';

    if (!this.userId) {
      this.message = 'Employee ID not found';
      return;
    }

    this.loadEmployeeData();
  }

=======
 
  ngOnInit(): void {
    this.initForm();
 
    this.employeeId = localStorage.getItem('employeeId') || '';
 
    if (!this.employeeId) {
      this.message = 'Employee ID not found';
      return;
    }
 
    this.loadEmployeeData();
  }
 
>>>>>>> 332a3023466cb03445ef25d72808d230e2eb9ca9
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
<<<<<<< HEAD

  // ---------------- LOAD DATA ----------------
  loadEmployeeData() {
    this.empService.getEmployeeById(this.userId).subscribe({
      next: (res: any) => {

        const data = res.data;

        // update correct ID from backend
        this.userId = data.employee.id;

=======
 
  // ---------------- LOAD DATA ----------------
  loadEmployeeData() {
    this.empService.getEmployeeById(this.employeeId).subscribe({
      next: (res: any) => {
 
        const data = res.data;
 
        // update correct ID from backend
        this.employeeId = data.employee.id;
 
>>>>>>> 332a3023466cb03445ef25d72808d230e2eb9ca9
        this.editForm.patchValue({
          employee: {
            ...data.employee,
            date_of_birth: this.formatDate(data.employee.date_of_birth)
          },
          employeeDetails: data.employeeDetails,
          jobDetails: {
            ...data.jobDetails,
            joining_date: this.formatDate(data.jobDetails.joining_date),
<<<<<<< HEAD

            // array → string for UI
            skills: data.jobDetails.skills?.join(', '),

=======
 
            // array → string for UI
            skills: data.jobDetails.skills?.join(', '),
 
>>>>>>> 332a3023466cb03445ef25d72808d230e2eb9ca9
            prev_org: data.jobDetails.prev_org
              ?.map((x: any) => x.company)
              .join(', ')
          }
        });
      }
    });
  }
<<<<<<< HEAD

=======
 
>>>>>>> 332a3023466cb03445ef25d72808d230e2eb9ca9
  // ---------------- DATE FORMAT ----------------
  formatDate(date: string) {
    return date ? date.split('T')[0] : '';
  }
<<<<<<< HEAD

  // ---------------- UPDATE ----------------
  onUpdate() {

    const form = this.editForm.value;

=======
 
  // ---------------- UPDATE ----------------
  onUpdate() {
 
    const form = this.editForm.value;
 
>>>>>>> 332a3023466cb03445ef25d72808d230e2eb9ca9
    // ✅ FINAL STRUCTURE EXACTLY MATCHING BACKEND
    const payload = {
      employee: {
        ...form.employee
      },
<<<<<<< HEAD

      employeeDetails: {
        ...form.employeeDetails
      },

      jobDetails: {
        ...form.jobDetails,

=======
 
      employeeDetails: {
        ...form.employeeDetails
      },
 
      jobDetails: {
        ...form.jobDetails,
 
>>>>>>> 332a3023466cb03445ef25d72808d230e2eb9ca9
        // string → array
        skills: form.jobDetails.skills
          ? form.jobDetails.skills.split(',').map((s: string) => s.trim())
          : [],
<<<<<<< HEAD

=======
 
>>>>>>> 332a3023466cb03445ef25d72808d230e2eb9ca9
        prev_org: form.jobDetails.prev_org
          ? form.jobDetails.prev_org.split(',').map((c: string) => ({
              company: c.trim(),
              years: 0
            }))
          : []
      }
    };
<<<<<<< HEAD

    console.log("FINAL PAYLOAD →", payload);

    this.empService.updateEmployee(this.userId, payload).subscribe({
=======
 
    console.log("FINAL PAYLOAD →", payload);
 
    this.empService.updateEmployee(this.employeeId, payload).subscribe({
>>>>>>> 332a3023466cb03445ef25d72808d230e2eb9ca9
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