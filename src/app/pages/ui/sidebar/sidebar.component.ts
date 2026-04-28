// src/app/pages/ui/sidebar/sidebar.component.ts
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private renderer: Renderer2) { }
  isCollapsed = false;
  private readonly storageKey = 'emsSidebarCollapsed';

  ngOnInit(): void {
    this.isCollapsed = localStorage.getItem(this.storageKey) === 'true';
    this.updateBodyClass();
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(this.storageKey, String(this.isCollapsed));
    this.updateBodyClass();
  }

  private updateBodyClass(): void {
    if (this.isCollapsed) {
      this.renderer.addClass(document.body,'sidebar-collapsed');
    } else {
      this.renderer.removeClass(document.body,'sidebar-collapsed');
    }
  }
}