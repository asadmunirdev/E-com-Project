import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
export const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: SellerAuthComponent,
    path: 'seller-auth',
  },
  {
    component: SellerHomeComponent,
    path: 'seller-home',
    canActivate: [AuthGuard]
  },
];
