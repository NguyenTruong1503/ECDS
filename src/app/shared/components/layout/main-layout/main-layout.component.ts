import {Component, computed, inject, signal} from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { MatSidenavModule } from '@angular/material/sidenav'; // Import MatSidenavModule

// Import các component con standalone
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {MatToolbar} from '@angular/material/toolbar';
import {CollapsedStore} from '../../../../stores/collapsed.store';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    HeaderComponent,
    SidebarComponent,
    MatToolbar,

  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  collapsed = signal(false);

  onSiveNavToggle(value: boolean) {
    this.collapsed.set(value);
  }
  sidenavWidth = computed(() => this.collapsed() ? '56px' : '260px')

}
