import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../apis/storage.service';
import { UserService } from '../apis/user.service';
import { User } from '../models/users-model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  old: User = {

    user_id: -1,
    bio: "",
    birthday: new Date(),
    email: "",
    followers: -1,
    followings: -1,
    gender: -1,
    join: new Date(),
    picture: "",
    username: ""

  };
  user: User = {

    user_id: -1,
    bio: "",
    birthday: new Date(),
    email: "",
    followers: -1,
    followings: -1,
    gender: -1,
    join: new Date(),
    picture: "",
    username: ""

  };
  constructor(private userService: UserService, private storageService: StorageService, private toastController: ToastController, private router: Router) { }

  ngOnInit() {

    this.storageService.get<User>("loggedInUser").then(response => {

      this.user = response;
      this.old = response

    });

  }

  private async displayWarning(msg: string) {

    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      icon: 'globe'
    });

    await toast.present();

  }

  onEdit() {
    if (this.user.username!.length < 4) {

      this.displayWarning("Username too Short");

    } else if (this.user.email!.length < 4 || !this.user.email?.includes("@") || !this.user.email?.includes(".")) {

      this.displayWarning("Invalid email");

    } else {

      this.userService.check({ username: this.user.username, email: this.user.email }).subscribe(response => {

        if (response.email_taken && this.old.email != this.user.email) {

          this.displayWarning("Email Taken");

        } else if (response.username_taken && this.old.username != this.user.username) {

          this.displayWarning("Username Taken");

        } else {

          this.userService.updateUser(this.user).subscribe(response => {

            this.storageService.set("loggedInUser", this.user);
            this.router.navigate(['/profile', { id: response.user?.user_id }]);

          })
        }
      });
    }


  }

}
