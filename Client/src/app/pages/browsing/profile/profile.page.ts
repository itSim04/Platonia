import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, InfiniteScrollCustomEvent, IonPopover, ModalController, NavController } from '@ionic/angular';
import { UtilityService } from 'src/app/linking/apis/utility.service';
import { Thought } from 'src/app/linking/models/thought-main';
import { User } from 'src/app/linking/models/user-main';
import { BuildAPIs, ExitCodes } from '../../../helper/constants/db_schemas';
import { presentAlert } from '../../../helper/utility';
import { FollowService } from '../../../linking/apis/follow.service';
import { StorageService } from '../../../linking/apis/storage.service';
import { ThoughtService } from '../../../linking/apis/thought.service';
import { UserService } from '../../../linking/apis/user.service';
import { EditProfilePage } from '../edit-profile/edit-profile.page';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  is_modal_open: boolean = false; // Whether the edit profile is running
 
  owner: boolean = false; // Whether this profile belongs to the logged in use
  verification: boolean = false; // Whether the current profile is verified
  uploading: boolean = false; // Whether the profile is uploading
  is_followed: boolean = false; // Whether the page is followed

  current_user?: User; // The owner of the profile

  bio_edit_mode: boolean = false; // Whether the bio is being edited
  new_bio: string = ""; // The new bio

  thoughts: Array<Thought> = new Array(); // The thoughts on the profile
  anchor: number = 0; // Used for pagination
  quantity: number = 5; // Size of pagination

  @ViewChild('options') option!: IonPopover; // The options menu


  constructor(private utilityService: UtilityService, private thoughtService: ThoughtService, private alertController: AlertController, private modalCtrl: ModalController, private followService: FollowService, private storage: StorageService, private userService: UserService, private route: ActivatedRoute, private router: Router, private nav: NavController) {
  }

  ngOnInit(): void {

    this.ionViewWillEnter();

  }

  public uploadBanner() {

    // Uploads a banner
    if (this.owner) {
      Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,

      }).then(image => {
        this.uploading = true;
        this.userService.uploadBanner({ picture: image.base64String, user_id: this.current_user!.user_id }).subscribe(response => {

          this.uploading = false;
          console.log("Banner", response);
          this.current_user!.banner = `${BuildAPIs.MAIN}/Server/assets/users/${this.current_user!.user_id}/banners/banner-${response.banner_id! - 1}.png`;
          this.storage.getSessionUser().then(r =>

            r.banner = this.current_user!.banner

          );

        })
      });
    }
  }

  meet() {

    // Opens the meeting menu

    this.router.navigate(["meeting"]);

  }

  openOptions() {

    // Opens options

    if (this.owner) {

      if (this.option.isOpen) {

        this.option.dismiss();


      } else {

        this.option.present();

      }
    } else {

      this.storage.getSessionUser().then(current_profile => {

        if (this.is_followed) {

          this.followService.unfollow(current_profile.user_id, this.current_user!.user_id).subscribe(r => {

            this.is_followed = false;
            this.current_user!.followers--;

          });

        } else {

          this.followService.follow(current_profile.user_id, this.current_user!.user_id).subscribe(r => {

            this.is_followed = true;
            this.current_user!.followers++;

          });

        }



      });

    }
  }

  async openModal() {

    // Opens the edit menu

    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
    });
    modal.present();

    await modal.onWillDismiss();

    this.ionViewWillEnter();
  }

  ionViewWillEnter(): void {

    // Retrieves thoughts
    console.log(this.thoughts, this.anchor);

    const id_obj = this.route.snapshot.paramMap.get("id");
    const id: number = Number.parseInt(id_obj != null ? id_obj : "0");

    this.storage.getSessionUser().then(current_user => {

      if (!id || id == current_user.user_id) {

        this.owner = true;
        this.current_user = current_user;
        this.new_bio = this.current_user.bio;

        if (!this.current_user!.is_verified) {

          this.displayVerification();

        }

      } else {

        this.userService.getOne({ user_id: id }).subscribe(current_profile => {

          this.current_user = current_profile.user;

          this.owner = false;
          this.followService.isFollowing(current_user.user_id, current_profile.user!.user_id).subscribe(r => this.is_followed = r.follows!)

          this.retrieveData();

        });
      }


    }).catch(r => console.log("Error", r));



  }

  public editBio() {

    // Uploads new bio

    if (this.bio_edit_mode) {

      this.bio_edit_mode = false;
      this.current_user!.bio = this.new_bio;
      this.userService.updateUser(this.current_user!).subscribe(r => this.bio_edit_mode = false);

    } else {

      this.bio_edit_mode = true;
      this.new_bio = this.current_user!.bio;

    }

  }

  retrieveData() {

    // Retrieves thoughts
    this.thoughtService.getBy({ user_id: this.current_user!.user_id, owner_id: this.current_user!.user_id, offset: this.anchor, quantity: this.quantity }).subscribe(r => {

      r.thoughts?.forEach(t => this.thoughts.push(t));

    });

  }

  onIonInfinite(ev: any) {

    // Handles scrolling
    this.anchor = this.thoughts.length;
    this.retrieveData();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  async handleRefresh(event: any) {

    // Handles refreshing
    setTimeout(() => {
      this.thoughts.splice(0);
      this.anchor = 0;
      this.retrieveData();
      event.target.complete();
    }, 2000);

  };

  public openFriendsList() {

    // Opens the friend list
    this.router.navigate(['/friend-list', { id: this.current_user?.user_id }]);

  }

  public logout() {

    // Logs the current user out
    this.current_user = undefined;

    this.storage.set("loggedInUser", undefined).then(r => this.router.navigate(['/login'], { replaceUrl: true }));

  }

  public editProfile() {

    // Triggers the edit profile

    this.openModal();

  }

  onWillDismiss(event: Event) {

    // Used for refreshing
    this.ionViewWillEnter();

  }


  goBack() {

    // Goes back to the profile
    this.nav.pop();

  }


  displayVerification() {

    // Prompts the user to verify their account
    if (!this.verification) {

      this.verification = true;

      const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);

      presentAlert(this.alertController, "Please Verify Your Email", [{
        id: 'verification',
        placeholder: '123456',
        min: 100000,
        max: 999999,
      }], [{

        text: "Send", handler: inputsData => {

          this.utilityService.sendCode(this.current_user?.email!, String(code)).subscribe(r => console.log(r));
          return false;

        }
      },
      {
        text: "Verify", handler: inputsData => {

          if (inputsData[0] == code) {
            this.userService.updateUser({ user_id: this.current_user?.user_id, is_verified: true }).subscribe(response => {

              console.log(response);
              if (response.status == ExitCodes.USERS_UPDATE) {
                this.alertController.dismiss('verification');
                return true;
              }
              return false;

            })
          }
          return false;

        }
      }]).then(r => r);;

    }
  }

}

