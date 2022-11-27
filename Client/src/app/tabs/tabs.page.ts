import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../apis/storage.service';
import { User } from '../models/users-model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  user: string = "";
  constructor(private storageService: StorageService, public router: Router) { }

  ionViewWillEnter() {
    this.openProfile();
  }
  openProfile() {
    this.storageService.get<User>("loggedInUser").then(r => {
      this.router.navigate(["tabs/profile/", { id: r.user_id }]);
      this.user = `profile;id=${r.user_id}`;
    });
  }

}
