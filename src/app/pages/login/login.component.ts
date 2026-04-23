import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface AuthResponse {
  success?: boolean;
  message?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {

    if (this.loginForm.invalid) {
      alert('All fields are required');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.auth.login(email, password).subscribe({
      next: (res: AuthResponse) => {
        if (res?.success) {
          this.router.navigate(['/home']);
          return;
        }

        alert(res?.message || 'Login failed');
      },
      error: (err) => {
        console.error(err);
        alert('Unable to login right now');
      }
    });

  }
}