import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { ModalController, ToastController, NavController } from "@ionic/angular";
import { BuildAPIs, ExitCodes } from "src/app/helper/constants/db_schemas";
import { Genders } from "src/app/helper/constants/general";
import { displayWarning } from "src/app/helper/utility";
import { StorageService } from "src/app/linking/apis/storage.service";
import { UserService } from "src/app/linking/apis/user.service";
import { UserRequest } from "src/app/linking/models/request-models";
import { User } from "src/app/linking/models/user-main";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {

  readonly genders: Array<string> = new Array(...Genders); // Instance of the Gender array

  user_id?: number; // The id of the logged in user
  username?: string; // The current username
  birthday?: string; // The current birthday
  gender?: number; // The current Gender
  email?: string; // The current email

  uploading: boolean = false; // Whether the Page is uploading content

  old_email?: string; // The old email
  old_username?: string; // The old username

  picture?: string; // The picture

  constructor(private modalCtrl: ModalController, private userService: UserService, private storageService: StorageService, private toastController: ToastController, private router: Router, private nav: NavController) {

    // defineCustomElements(window);

  }

  ionViewWillEnter() {

    // Retrieves the logged in user
    this.storageService.getSessionUser().then(user => {

      this.user_id = user.user_id;
      this.birthday = user.birthday.toISOString().slice(0, 10).replace('T', ' ');
      this.gender = user.gender;
      this.email = this.old_email = user.email;
      this.username = this.old_username = user.username;
      this.picture = user.picture;

    });

  }

  public uploadProfile() {

    // Uploads a profile picture

    Camera.getPhoto({

      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,

    }).then(image => {

      this.uploading = true;
      this.userService.uploadPicture({ picture: image.base64String, user_id: this.user_id }).subscribe(response => {

        this.uploading = false;
        this.picture = `${BuildAPIs.MAIN}/Server/assets/users/${this.user_id}/profiles/profile-${response.profile_id! - 1}.png`;
        this.storageService.getSessionUser().then(r =>

          r.picture = this.picture!

        );

      })
    });

  }


  setGender(e: any) {

    // Updates the Gender

    this.gender = User.numericalGender(e.detail.value);

  }

  onEdit() {

    // Triggers edit

    if (this.username!.length < 4) {

      displayWarning("Username too Short", this.toastController);

    } else if (this.email!.length < 4 || !this.email?.includes("@") || !this.email?.includes(".")) {

      displayWarning("Invalid email", this.toastController);

    } else {

      this.userService.check({ username: this.username, email: this.email }).subscribe(response => {

        if (response.email_taken && this.old_email != this.email) {

          displayWarning("Email Taken", this.toastController);

        } else if (response.username_taken && this.old_username != this.username) {

          displayWarning("Username Taken", this.toastController);

        } else {

          this.userService.updateUser({ user_id: this.user_id, username: this.username, birthday: new Date(this.birthday!), email: this.email, gender: this.gender }).subscribe(response => {

            if (response.status == ExitCodes.USERS_UPDATE) {

              this.storageService.set("loggedInUser", response.user);

            } else {

              console.log("Error in Edit Profile", response);

            }
            return this.modalCtrl.dismiss(null, 'cancel');

          })
        }
      });
    }
  }

  goBack() {

    // Goes back to the profile

    return this.modalCtrl.dismiss(null, 'cancel');

  }

}
