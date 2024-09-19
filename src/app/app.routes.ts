import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { NotFoundComponent } from './not-found/not-found.component'; // Import the NotFoundComponent
import { SearchComponent } from './search/search.component';

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
    canActivate: [AuthGuard],
  },
  {
    component: SellerAddProductComponent,
    path: 'seller-add-product',
    canActivate: [AuthGuard],
  },
  {
    component: SellerUpdateProductComponent,
    path: 'seller-update-product/:id',
    canActivate: [AuthGuard],
  },
  {
    component:SearchComponent,
    path:'search/:query'
  },
  {
    path: '**',
    component: NotFoundComponent, // Add this route for handling 404
  },

];
