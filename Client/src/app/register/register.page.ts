import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../apis/storage.service';
import { UserService } from '../apis/user.service';
import { USER_RESPONSE } from '../models/users-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  is_submitted: boolean = false;
  confirm_password?: string = "TEST123";
  new_user: USER_RESPONSE = {

    username: "TRY1",
    email: "TRY1@gmail",
    gender: 0,
    birthday: new Date(),
    password: "TEST123"

  };
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

  public onRegister() {

    if (this.new_user.username!.length < 4) {

      this.displayWarning("Username too Short");

    } else if (this.new_user.email!.length < 4 || !this.new_user.email?.includes("@") || !this.new_user.email?.includes(".")) {

      this.displayWarning("Invalid email");

    } else if (this.new_user.password!.length < 4) {

      this.displayWarning("Weak Password");

    } else if (this.new_user.password != this.confirm_password) {

      this.displayWarning("Password do not Match");

    } else {

      this.userService.check({ username: this.new_user.username, email: this.new_user.email }).subscribe(response => {

        if (response.email_taken) {

          this.displayWarning("Email Taken");

        } else if (response.username_taken) {

          this.displayWarning("Username Taken");

        } else {

          this.userService.addUser(this.new_user).subscribe(response => {

            this.storageService.set("loggedInUser", response.user);
            this.router.navigate(['/tabs', {id: response.user?.user_id}]);

          })
        }
      });
    }
  }

}
