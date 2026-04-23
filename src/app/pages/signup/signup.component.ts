import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

interface AuthResponse {
  success?: boolean;
  message?: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnDestroy {

  signupForm!: FormGroup;
  feedbackMessage = '';
  isSubmitting = false;
  isRedirecting = false;
  private redirectTimerId?: ReturnType<typeof setTimeout>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    if (this.redirectTimerId !== undefined) {
      clearTimeout(this.redirectTimerId);
    }
  }

  onSignUp(): void {
    if (this.signupForm.invalid || this.isSubmitting || this.isRedirecting) {
      this.signupForm.markAllAsTouched();
      this.feedbackMessage = 'Please complete the form correctly.';
      return;
    }

    const { email, password, role } = this.signupForm.value;
    this.feedbackMessage = '';
    this.isSubmitting = true;

    this.auth.signUp(email, password, role)
      .pipe(finalize(() => {
        this.isSubmitting = false;
      }))
      .subscribe({
      next: (res: AuthResponse) => {
        if (res?.success) {
          this.feedbackMessage = 'Signup successful. Redirecting to login...';
          this.isRedirecting = true;
          this.redirectTimerId = setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1200);
          return;
        }

        this.feedbackMessage = res?.message || 'Signup failed. Please try again.';
      },
      error: () => {
        this.feedbackMessage = 'Unable to sign up right now. Please try again.';
      }
    });
  }
}
