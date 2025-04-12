import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: { title: 'Trang Chủ' }
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'location',
        loadComponent: () => import('./features/location/location.component').then(m => m.LocationComponent),
        data: { title: 'Khu vực - địa bàn' }
      },
      {
        path: 'products',
        loadComponent: () => import('./features/product/product.component').then(m => m.ProductComponent),
        data : { title: 'Sản phẩm' }
      }
    ]
  },
  {
    path:'**',
    redirectTo: 'dashboard'
  }
];
