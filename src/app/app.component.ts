import { Component, OnInit } from '@angular/core';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private sesison: SessionService){}
  ngOnInit(): void {
    this.sesison.restoreSession();
  }
}
