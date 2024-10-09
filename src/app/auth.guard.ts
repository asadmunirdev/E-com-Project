import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SellerService } from './services/seller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sellerService: SellerService, private route : Router) {}

  canActivate(): boolean {
    if(localStorage.getItem('seller')){
      return true
    }
    return this.sellerService.isSellerLoggedIn.getValue(); // Use getValue() to get the current value
  }

}
