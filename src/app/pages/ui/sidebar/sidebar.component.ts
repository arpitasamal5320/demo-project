import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  private readonly storageKey = 'emsSidebarCollapsed';

  ngOnInit(): void {
    this.isCollapsed = localStorage.getItem(this.storageKey) === 'true';
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(this.storageKey, String(this.isCollapsed));
  }
}
