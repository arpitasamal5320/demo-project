import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onLogin(email: string, password: string) {

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