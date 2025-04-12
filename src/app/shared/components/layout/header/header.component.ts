import {Component, computed, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatBadge} from '@angular/material/badge';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadge,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  pageTitle: string = 'Trang chủ';

  notificationCount: number = 1;

   collapsed = signal(false);

  @Output() toggleSidenav = new EventEmitter<boolean>();
  toggle() {
    this.collapsed.set(!this.collapsed());
    this.toggleSidenav.emit(this.collapsed());
  }

  addNotification() {
    this.notificationCount++;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {

  }
}
