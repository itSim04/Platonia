import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
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
export class EditProfilePage implements OnInit {


  picture: string = "";
  old: USER_RESPONSE = {

    user_id: -1,
    bio: "",
    birthday: new Date(),
    email: "",
    gender: -1,
    picture: "",
    username: ""

  };
  user: USER_RESPONSE = {

    user_id: -1,
    bio: "",
    birthday: new Date(),
    email: "",
    gender: -1,
    username: ""

  };

  constructor(private userService: UserService, private storageService: StorageService, private toastController: ToastController, private router: Router) {

    defineCustomElements(window);

  }

  ngOnInit() {

    this.storageService.get<User>("loggedInUser").then(response => {

      this.user = response;
      this.picture = this.user.picture!;
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
      console.log(image);
      this.old.picture = image.base64String!;
      this.userService.updateUser(this.old).subscribe(response => {

        console.log(response);
        this.storageService.set("loggedInUser", response.user);
        this.picture = response.user!.picture;

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
            this.router.navigate(['/profile', { id: response.user?.user_id }]);

          })
        }
      });
    }


  }

}
