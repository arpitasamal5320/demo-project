import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSignUp(email: string, password: string, role: string) {

    if (!email || !password || !role) {
      alert('All fields are required');
      return;
    }

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