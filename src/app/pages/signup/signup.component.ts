import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {

  signupForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSignUp() {

    if (this.signupForm.invalid) {
      alert('All fields are required');
      return;
    }

    const { email, password, role } = this.signupForm.value;

    this.auth.signUp(email, password, role).subscribe({
      next: (res) => {
        console.log('Signup success:', res);

        // ✅ ALL USERS → LOGIN PAGE
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Signup failed');
      }
    });

  }
}