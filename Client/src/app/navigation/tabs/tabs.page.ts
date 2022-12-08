import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/linking/models/user-main';
import { StorageService } from '../../linking/apis/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  user: string = "";
  constructor(private storageService: StorageService, public router: Router) { }

  ionViewWillEnter() {
    this.storageService.getSessionUser().then(r => {
      this.user = `profile;id=${r.user_id}`;
    });
  }
  openProfile() {
    this.storageService.getSessionUser().then(r => {
      this.router.navigate(["tabs/profile/", { id: r.user_id }]);
      this.user = `profile;id=${r.user_id}`;
    });
  }

}
