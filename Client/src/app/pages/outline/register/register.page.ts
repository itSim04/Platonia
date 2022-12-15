import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Genders } from "src/app/helper/constants/general";
import { displayWarning } from "src/app/helper/utility";
import { StorageService } from "src/app/linking/apis/storage.service";
import { UserService } from "src/app/linking/apis/user.service";
import { User } from "src/app/linking/models/user-main";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  disabled: boolean = false; // Whether the page should be displayed (used for cleaner transitions)
  readonly genders: Array<string> = new Array(...Genders); // Instance of the gender array

  is_submitted: boolean = false; // Whether the user has registered

  username: string = ""; // The username
  birthday: string = "1989-12-13"; // The birthday
  gender: number = 0; // The gender
  email: string = ""; // The email
  password: string = ""; // The password
  confirm_password: string = ""; // Confirm Password

  constructor (private userService: UserService, private storageService: StorageService, private router: Router, private toastController: ToastController) { }

  public goToLogin() {

    // Go to Login

    this.disabled = true;
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 50);

  }

  ionViewDidLeave() {

    // Used for transitions
    this.disabled = false;
  }

  private async displayWarning(msg: string) {

    // Displays warning
    displayWarning(msg, this.toastController);

  }

  setGender(e: any) {

    // Updates the gender
    this.gender = User.numericalGender(e.detail.value);

  }

  public onRegister() {

    // Triggers registration
    if (this.username!.length < 4) {

      this.displayWarning("Username too Short");

    } else if (this.email!.length < 4 || !this.email?.includes("@") || !this.email?.includes(".")) {

      this.displayWarning("Invalid email");

    } else if (this.password!.length < 4) {

      this.displayWarning("Weak Password");

    } else if (this.password != this.confirm_password) {

      this.displayWarning("Password do not Match");

    } else {

      this.userService.check({ username: this.username, email: this.email }).subscribe(response => {

        if (response.email_taken) {

          this.displayWarning("Email Taken");

        } else if (response.username_taken) {

          this.displayWarning("Username Taken");

        } else {

          this.userService.addUser({ username: this.username, password: this.password, email: this.email, gender: this.gender, birthday: new Date(this.birthday) }).subscribe(response => {

            console.log("REGISTER", response);
            this.storageService.set("loggedInUser", response.user);
            this.router.navigate(['/tabs/profile', { id: response.user?.user_id }]);

          })
        }
      });
    }
  }

}
