import {
  Component,
  Input,
  HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title = 'Dashboard';

  showPopup = false;

  constructor(
    private router: Router,
    private session: SessionService
  ) { }

  togglePopup(event: MouseEvent): void {
    event.stopPropagation();
    this.showPopup = !this.showPopup;
  }

  @HostListener('document:click')
  closePopup(): void {
    this.showPopup = false;
  }

  logout(): void {
    this.session.logout();
  }
}