import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { EmailValidator } from 'src/app/core/validators/email.validator';
import { CheckRegistrationService } from 'src/app/core/services/check-registration.service';
 
interface AuthResponse {
  message?: string;
  token?: {
    token?: string;
  };
}
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
 
  feedbackMessage = '';
  isSubmitting = false;
 
  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private crs: CheckRegistrationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, EmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  onLogin(): void {
    if (this.loginForm.invalid || this.isSubmitting) {
      this.loginForm.markAllAsTouched();
      this.feedbackMessage = 'Please complete the form correctly.';
      return;
    }
 
    const { email, password } = this.loginForm.value;
    this.feedbackMessage = '';
    this.isSubmitting = true;
 
    this.auth.login(email, password)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: (res: AuthResponse) => {
          if (res?.message === 'success') {
            const token = res?.token?.token;
 
            if (token) {
              localStorage.setItem('authToken', token);
 
              this.crs.checkRegistrationStatus().subscribe({
                next: (statusRes: any) => {
                  const isRegistered = !!statusRes.data.isRegistered;
                  const employeeId = statusRes.data.id;

                  localStorage.setItem('isRegistered', String(isRegistered));
                  localStorage.setItem('employeeId', employeeId);

                  if (isRegistered) {
                    this.router.navigate(['/dashboard']);
                  } else {
                    this.router.navigate(['/emp-basic-regis']);
                  }
                },
 
                error: () => {
                  this.feedbackMessage =
                    'Failed to verify account status.';
                }
              });
 
              return;
            }
 
            this.feedbackMessage = 'Token missing from response.';
            return;
          }
 
          this.feedbackMessage =
            res?.message || 'Login failed. Please try again.';
        },
 
        error: () => {
          this.feedbackMessage = 'Login failed. Please try again.';
        }
      });
  }
}