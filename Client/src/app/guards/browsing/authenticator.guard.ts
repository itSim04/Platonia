import { StorageService } from './../../linking/apis/storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController, ToastController } from '@ionic/angular';
import { displayWarning } from 'src/app/helper/utility';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorGuard implements CanActivate {

  // Guards the browsing section to Logged in users
  constructor (
    private toastController: ToastController,
    private storageService: StorageService,
    private navCtrl: NavController
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return await this.checkAuth();
  }

  private async checkAuth() {
    const authed = await this.storageService.isAuthenticated();
    return authed || this.routeToLogin();
  }

  private routeToLogin(): boolean {
    this.navCtrl.navigateRoot('/login');
    displayWarning("Session Expired", this.toastController)
    return false;
  }
}
