import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "src/app/linking/apis/storage.service";
import { UserService } from "src/app/linking/apis/user.service";

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {

  // Splash Screen
  constructor(private storageService: StorageService, private userService: UserService, private router: Router) { }

  ionViewWillEnter() {

    // Quickly authenticates and updates the user
    this.storageService.getSessionUser().then(r => {

      if (r.user_id != undefined) {

        this.userService.getOne({ user_id: r.user_id }).subscribe(response => {

          if (response.user) {
            this.storageService.set("loggedInUser", response.user);
            this.router.navigate(["tabs/profile/", { id: response.user?.user_id }], { replaceUrl: true });
          } else {
            this.router.navigate(["/login"], { replaceUrl: true });
          }
        })
      } else {

        this.router.navigate(["/login"], { replaceUrl: true });

      }
    });
  }

}
