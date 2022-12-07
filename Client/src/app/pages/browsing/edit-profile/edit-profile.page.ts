import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { StorageService } from '../../../linking/apis/storage.service';
import { UserService } from '../../../linking/apis/user.service';
import { User, USER_RESPONSE } from '../../../linking/models/users-model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Genders } from '../../../helper/constants/general';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {
  debug(event: any) {
    console.log(event);
  }

  old: User = {

    user_id: -1,
    bio: "",
    birthday: new Date(),
    email: "",
    gender: -1,
    picture: "",
    banner: "",
    username: "",
    join: new Date(),
    is_verified: false,
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

  genders: Array<string> = new Array(...Genders);
  new_birthday: string = "";

  constructor(private modalCtrl: ModalController, private userService: UserService, private storageService: StorageService, private toastController: ToastController, private router: Router, private nav: NavController) {

    defineCustomElements(window);

  }

  ionViewWillEnter() {

    this.storageService.get<User>("loggedInUser").then(response => {

      this.user = response;
      this.old = response;
      this.new_birthday = this.user.birthday!.toISOString().slice(0, 10).replace('T', ' ');

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
      source: CameraSource.Photos,

    }).then(image => {
      this.userService.uploadPicture({ picture: image.base64String, user_id: this.old.user_id }).subscribe(response => {

        this.old.picture = `http://localhost/Platonia/Server/assets/users/${this.old.user_id}/profiles/profile-${response.profile_id! - 1}.png`;
        this.storageService.get<User>("loggedInUser").then(r =>

          r.picture = this.old.picture

        );

      })
    });

  }

  setGender(e: any) {

    switch (e.detail.value) {

      case this.genders[0]:

        this.user.gender = 0;
        break;

      case this.genders[1]:

        this.user.gender = 1;
        break;

      case this.genders[2]:

        this.user.gender = 2;
        break;

      case this.genders[3]:

        this.user.gender = 3;
        break;
    }


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

          this.user.birthday = new Date(this.new_birthday);
          console.log(this.user.birthday);
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
