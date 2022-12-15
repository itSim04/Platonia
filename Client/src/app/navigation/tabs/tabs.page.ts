import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../linking/apis/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  // Tabs router
  user: string = "";
  constructor(private storageService: StorageService, public router: Router) { }

  ionViewWillEnter() {

    // retrieves the logged in user
    this.storageService.getSessionUser().then(r => {
      this.user = `profile;id=${r.user_id}`;
    });
  }
  openProfile() {

    // Opens the logged in profile
    this.storageService.getSessionUser().then(r => {
      this.router.navigate(["tabs/profile/", { id: r.user_id }]);
      this.user = `profile;id=${r.user_id}`;
    });
  }
}
