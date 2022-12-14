import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Genders } from "src/app/helper/constants/general";
import { StorageService } from "src/app/linking/apis/storage.service";
import { UserService } from "src/app/linking/apis/user.service";
import { User } from "src/app/linking/models/user-main";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  readonly genders: Array<string> = new Array(...Genders);

  is_submitted: boolean = false;

  username: string = "";
  birthday: string = "1989-12-13";
  gender: number = 0;
  email: string = "";
  password: string = "";
  confirm_password: string = "";

  constructor(private userService: UserService, private storageService: StorageService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  public goToLogin() {

    this.router.navigate(['/login'])

  }

  private async displayWarning(msg: string) {

    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      icon: 'globe'
    });

    await toast.present();
  }

  setGender(e: any) {

    this.gender = User.numericalGender(e.detail.value);

  }

  public onRegister() {

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
