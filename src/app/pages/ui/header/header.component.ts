import { Component, Input, HostListener } from '@angular/core';
import { SessionService } from 'src/app/core/services/session.service';
import { SidebarStateService } from '../sidebar/sidebar-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title = 'Dashboard';

  showPopup = false;

  constructor(
    private session: SessionService,
    public sidebarState: SidebarStateService
  ) {}

  togglePopup(event: MouseEvent): void {
    event.stopPropagation();
    this.showPopup = !this.showPopup;
  }

  toggleMobileSidebar(event: MouseEvent): void {
    event.stopPropagation();
    this.sidebarState.toggleMobileSidebar();
  }

  @HostListener('document:click')
  closePopup(): void {
    this.showPopup = false;
  }

  logout(): void {
    this.session.logout();
  }
}