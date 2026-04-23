import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      next: (res) => {
        console.log('Login success:', res);
        alert('Login successful!');

        // 🔁 Redirect to home 
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        alert('Login failed');
      }
    });

  }
}