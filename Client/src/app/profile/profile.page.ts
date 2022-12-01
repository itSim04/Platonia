import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../apis/storage.service';
import { UserService } from '../apis/user.service';
import { User } from '../models/users-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonPopover, ModalController, NavController } from '@ionic/angular';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { FollowService } from '../apis/follow.service';
import { presentAlert } from '../helper/utility';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { EXIT_CODES } from '../helper/constants/db_schemas';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  is_modal_open: boolean = false;

  owner: boolean = false;
  is_followed: boolean = false;

  current_user?: User;

  bio_edit_mode: boolean = false;
  new_bio: string = "";

  @ViewChild('options') option!: IonPopover;

  constructor(private emailComposer: EmailComposer, private alertController: AlertController, private modalCtrl: ModalController, private followService: FollowService, private storage: StorageService, private userService: UserService, private route: ActivatedRoute, private router: Router, private nav: NavController) {
  }

  ngOnInit(): void {

    this.ionViewWillEnter();
    
  }

  openOptions() {

    if (this.owner) {

      if (this.option.isOpen) {

        this.option.dismiss();


      } else {

        this.option.present();

      }
    } else {

      this.storage.get<User>("loggedInUser").then(current_profile => {

        if (this.is_followed) {

          this.followService.unfollow(current_profile.user_id, this.current_user!.user_id).subscribe(r =>

            this.is_followed = false

          );

        } else {

          this.followService.follow(current_profile.user_id, this.current_user!.user_id).subscribe(r =>

            this.is_followed = true

          );

        }

      });

    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
    });
    modal.present();

    await modal.onWillDismiss();

    this.ionViewWillEnter();
  }

  ionViewWillEnter(): void {

    const id_obj = this.route.snapshot.paramMap.get("id");
    const id: number = Number.parseInt(id_obj != null ? id_obj : "0");
    if (id == null || !id) {

      this.storage.get("loggedInUser").then((r) => {

        this.current_user = <User>r;
        this.owner = true;
        this.new_bio = this.current_user!.bio;

      });

    } else {

      this.userService.getOne({ user_id: id }).subscribe(current_profile => {

        this.current_user = current_profile.user;
        this.storage.get<User>("loggedInUser").then(current_user => {

          if (current_user.user_id == this.current_user!.user_id) {

            this.owner = true;

          } else {

            this.owner = false;
            this.followService.isFollowing(current_user.user_id, current_profile.user!.user_id).subscribe(r => this.is_followed = r.follows!)

          }

          this.new_bio = this.current_user!.bio
        });

      })

    }

    if (this.owner && !this.current_user?.is_verified) {

      this.displayVerification();

    }

  }

  public editBio() {

    if (this.bio_edit_mode) {

      this.bio_edit_mode = false;
      this.current_user!.bio = this.new_bio;
      this.userService.updateUser(this.current_user!).subscribe(r => this.bio_edit_mode = false);

    } else {

      this.bio_edit_mode = true;
      this.new_bio = this.current_user!.bio;

    }

  }


  public openFriendsList() {

    this.router.navigate(['/friend-list', { id: this.current_user?.user_id }]);

  }

  public logout() {

    this.storage.set("loggedInUser", undefined).then(r => this.router.navigate(['/login']));

  }

  public editProfile() {

    this.openModal();

  }

  onWillDismiss(event: Event) {
    this.ionViewWillEnter();
  }


  goBack() {

    this.nav.pop();

  }


  displayVerification() {
    presentAlert(this.alertController, "Please Verify Your Email", [{
      id: 'verification',
      placeholder: '123456',
      min: 100000,
      max: 999999,
    }], [{
      text: "Send", handler: inputsData => {

        let email = {
          to: 'moawadsimon@gmail.com',
          subject: 'Verification code',
          body: 'How are you? Nice greetings',
          isHtml: true
        }

        this.emailComposer.open(email);
        return false;

      }
    },
    {
      text: "Verify", handler: inputsData => {

        if (inputsData[0] == 123456) {
          this.userService.updateUser({ user_id: this.current_user?.user_id, is_verified: true }).subscribe(response => {

            console.log(response);
            if (response.status == EXIT_CODES.USERS_UPDATE) {
              this.alertController.dismiss('verification');
            }
            return false;

          })
        }
        return false;

      }
    }]).then(r => r);;

  }

}

