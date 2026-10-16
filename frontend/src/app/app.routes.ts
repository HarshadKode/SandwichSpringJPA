import { Routes } from '@angular/router';
import { Admin } from './admin/admin';
import { Menu } from './menu/menu';
import { Order } from './order/order';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'menu' },
  { path: 'menu', component: Menu, title: 'Menu - Abis Sandwiches' },
  { path: 'order', component: Order, title: 'Order - Abis Sandwiches' },
  { path: 'admin', component: Admin, title: 'Admin - Abis Sandwiches' },
  { path: '**', redirectTo: 'menu' },
];
