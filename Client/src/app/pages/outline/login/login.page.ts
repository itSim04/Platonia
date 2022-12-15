import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { displayWarning } from 'src/app/helper/utility';
import { StorageService } from '../../../linking/apis/storage.service';
import { UserService } from '../../../linking/apis/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  disabled: boolean = false; // Whether the page should be displayed (used for cleaner transitions)
  username: string = ""; // The username
  password: string = ""; // The password
  constructor (public router: Router, private userService: UserService, private storageService: StorageService, public toastController: ToastController) { }

  private async displayWarning(msg: string) {

    // Displays a warning
    displayWarning(msg, this.toastController);

  }

  ionViewDidLeave() {

    // Used for transitions
    this.disabled = false;
    this.username = "";
    this.password = "";
  }

  onLogin() {

    // Triggers login
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

    // Go to Register
    this.disabled = true;
    setTimeout(() => {
      this.router.navigate(['/register'], { replaceUrl: true });
    }, 50);


  }

  goToForget() {
  
    // Go to forget password
    this.disabled = true;
    setTimeout(() => {
      this.router.navigate(['/forget-password']);
    }, 50);


  }

}
