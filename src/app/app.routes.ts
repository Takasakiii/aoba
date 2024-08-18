import { Routes } from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./layouts/logged/logged.component').then(m => m.LoggedComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      }
    ]
  }
];
