import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ModalController, NavController, ToastController } from '@ionic/angular';
import { StorageService } from '../apis/storage.service';
import { UserService } from '../apis/user.service';
import { User, USER_RESPONSE } from '../models/users-model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {

  old: User = {

    user_id: -1,
    bio: "",
    birthday: new Date(),
    email: "",
    gender: -1,
    picture: "",
    username: "",
    join: new Date(),
    followers: -1,
    followings: -1

  };
  user: USER_RESPONSE = {

    user_id: -1,
    bio: "",
    birthday: new Date(),
    email: "",
    gender: -1,
    username: ""

  };

  constructor(private modalCtrl: ModalController, private userService: UserService, private storageService: StorageService, private toastController: ToastController, private router: Router, private nav: NavController) {

    defineCustomElements(window);

  }



  ionViewWillEnter() {

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

  public uploadProfile() {

    Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    }).then(image => {
      this.userService.uploadPicture({ picture: image.base64String, user_id: this.old.user_id }).subscribe(response => {

        this.old.picture = `http://localhost/Platonia/Server/assets/${this.old.user_id}/profile-${response.profile_id! - 1}.png`;
        this.storageService.get<User>("loggedInUser").then(r =>

          r.picture = this.old.picture

        );

      })
    });

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

            this.storageService.set("loggedInUser", response.user);
            return this.modalCtrl.dismiss(null, 'cancel');

          })
        }
      });
    }
  }

  goBack() {

    return this.modalCtrl.dismiss(null, 'cancel');

  }

}
