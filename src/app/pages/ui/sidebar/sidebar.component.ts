import { Component } from '@angular/core';
import { SidebarStateService } from './sidebar-state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(public sidebarState: SidebarStateService) {}

  toggleSidebar(): void {
    this.sidebarState.toggleDesktopSidebar();
  }

  closeMobileSidebar(): void {
    this.sidebarState.closeMobileSidebar();
  }
}