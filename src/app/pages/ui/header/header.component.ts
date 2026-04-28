import {
  Component,
  Input,
  HostListener
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title = 'Dashboard';

  showPopup = false;

  constructor(private router: Router) {}

  togglePopup(event: MouseEvent): void {
    event.stopPropagation();
    this.showPopup = !this.showPopup;
  }

  @HostListener('document:click')
  closePopup(): void {
    this.showPopup = false;
  }

  logout(): void {
    localStorage.clear();

    document.cookie.split(';').forEach(cookie => {
      document.cookie =
        cookie.split('=')[0].trim() +
        '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
    });

    this.router.navigate(['/login']);
  }
}