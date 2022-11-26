import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StorageService } from '../apis/storage.service';
import { User } from '../models/users-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  current_user?: User;
  constructor(private storage: StorageService) {

    this.storage.get("loggedInUser").then(r => {
      this.current_user = <User>r;
      console.log(this.current_user);
    });


  }



}
