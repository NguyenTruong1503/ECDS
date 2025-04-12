import {Component, computed, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from '@angular/material/list';
import {CollapsedStore} from '../../../../stores/collapsed.store'; // Import MatButtonModule


interface MenuNode {
  name: string;
  icon: string;
  route?: string;
  children?: MenuNode[];
}



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {


  menuData: MenuNode[] = [
    {
      name: 'Trang chủ',
      icon: 'home',
      route: '/dashboard'
    },
    {
      name: 'Khu vực - địa bàn',
      icon: 'location_on',
      route: '/location'
    },
    {
      name: 'Sản phẩm',
      icon: 'inventory',
      route: '/products'
    },
    {
      name: 'Đại lý',
      icon: 'people',
      route: '/orders'
    },
    {
      name: 'Công ty phân phối',
      icon: 'local_shipping',
      route: '/statistics'
    },
    {
      name: 'Hợp đồng',
      icon: 'feed',
      route: '/statistics'
    },
    {
      name: 'Quản lý admin',
      icon: 'list',
      route: '/statistics'
    },
    {
      name: 'Phân quyền sử dụng',
      icon: 'settings',
      route: '/statistics'
    },
  ]

}
