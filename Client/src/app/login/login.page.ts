import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { StorageService } from '../apis/storage.service';
import { UserService } from '../apis/user.service';
import { User } from '../models/users-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

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



  onLogin() {

    this.userService.authenticate({ username: this.username, password: this.password }).subscribe(response => {

      console.log(response);
      if (response.user != undefined) {

        this.storageService.set("loggedInUser", response.user);
        this.router.navigate(["/tabs", { id: response.user.user_id }]);

      } else {

        this.displayWarning("Incorrect Credentials")

      }
    })

  }

  goToRegister() {

    this.router.navigate(['/register']);

  }

}
