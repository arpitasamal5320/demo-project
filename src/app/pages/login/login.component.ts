import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { EmailValidator } from 'src/app/core/validators/email.validator';
import { CheckRegistrationService } from 'src/app/core/services/check-registration.service';
import { SessionService } from 'src/app/core/services/session.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NotFoundError } from 'rxjs';

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
    private crs: CheckRegistrationService,
    private session: SessionService,
    private notify: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, EmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  onLogin(): void {
    if (this.loginForm.invalid || this.isSubmitting) {
      this.loginForm.markAllAsTouched();
      this.notify.showWarning('Warning', 'Please complete the form correctly.');
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
              this.session.startSession(token);

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

                error: (err) => {
                  this.notify.showError(err);
                }
              });
 
              return;
            }

            this.notify.showMessage('Warning', 'Token missing from response.');
            return;
          }

          this.notify.showError(res);
        },

        error: (err) => {
          this.notify.showError(err);
        }
      });
  }
}