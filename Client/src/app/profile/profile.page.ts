import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../apis/storage.service';
import { UserService } from '../apis/user.service';
import { User } from '../models/users-model';
import { Component, ViewChild } from '@angular/core';
import { IonPopover, ModalController, NavController } from '@ionic/angular';
import { EditProfilePage } from '../edit-profile/edit-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  isModalOpen: boolean = false;
  owner: boolean = false;
  current_user?: User;
  @ViewChild('options') option!: IonPopover;

  constructor(private modalCtrl: ModalController, private storage: StorageService, private userService: UserService, private route: ActivatedRoute, private router: Router, private nav: NavController) {
  }

  openOptions() {

    if (this.option.isOpen) {
      this.option.dismiss();
    } else {
      this.option.present();
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
    });
    modal.present();

    this.ionViewWillEnter();
  }

  ionViewWillEnter(): void {

    const id_obj = this.route.snapshot.paramMap.get("id");
    const id: number = Number.parseInt(id_obj != null ? id_obj : "0");
    if (id == null || !id) {

      this.storage.get("loggedInUser").then((r) => {

        this.current_user = <User>r;
        this.owner = true;

      });

    } else {

      this.userService.getOne({ user_id: id }).subscribe(r => {

        this.current_user = r.user;
        this.storage.get("loggedInUser").then(r => this.owner = (<User>r).user_id == this.current_user!.user_id);

      })

    }


  }


  public openFriendsList() {

    this.router.navigate(['/friend-list', { id: this.current_user?.user_id }]);

  }

  public logout() {

    this.storage.set("loggedInUser", undefined).then(r => this.router.navigate(['/login']));

  }

  public edit() {

    this.openModal();

  }

  onWillDismiss(event: Event) {
    this.ionViewWillEnter();
  }


  goBack() {

    this.nav.pop();

  }
}

