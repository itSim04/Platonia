import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../../../linking/apis/storage.service';
import { UserService } from '../../../linking/apis/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  disabled: boolean = false;
  username: string = "";
  password: string = "";
  constructor(public router: Router, private userService: UserService, private storageService: StorageService, public toastController: ToastController) { }

  private async displayWarning(msg: string) {

    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      icon: 'globe'
    });

    await toast.present();

  }

  ionViewDidLeave() {
    this.disabled = false;
    this.username = "";
    this.password = "";
  }

  onLogin() {

    this.userService.authenticate({ username: this.username, password: this.password }).subscribe(response => {

      if (response.user != undefined) {

        this.storageService.set("loggedInUser", response.user);
        this.router.navigate(["/tabs/profile", { id: response.user.user_id }]);

      } else {

        this.displayWarning("Incorrect Credentials")

      }
    })

  }

  goToRegister() {

    this.disabled = true;
    setTimeout(() => {
      this.router.navigate(['/register']);
    }, 50);


  }

  goToForget() {

    this.disabled = true;
    setTimeout(() => {
      this.router.navigate(['/forget-password']);
    }, 50);


  }

}
