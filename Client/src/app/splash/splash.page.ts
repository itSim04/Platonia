import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../apis/storage.service';
import { UserService } from '../apis/user.service';
import { User } from '../models/users-model';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {

  constructor(private storageService: StorageService, private userService: UserService, private router: Router) { }

  ionViewWillEnter() {

    this.storageService.get("loggedInUser").then(r => {
      if (r != undefined) {

        this.userService.getOne({ user_id: (<User>r).user_id }).subscribe(response => {

          this.storageService.set("loggedInUser", response.user);
          this.router.navigate(["/profile", { id: response.user?.user_id }]);

        })
      } else {

        this.router.navigate(["/login"]);

      }
    });
  }

}
