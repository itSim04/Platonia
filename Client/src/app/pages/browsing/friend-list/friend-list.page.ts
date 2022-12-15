import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { FollowService } from "src/app/linking/apis/follow.service";
import { StorageService } from "src/app/linking/apis/storage.service";
import { UserService } from "src/app/linking/apis/user.service";
import { User } from "src/app/linking/models/user-main";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.page.html',
  styleUrls: ['./friend-list.page.scss'],
})
export class FriendListPage {

  current_user?: User; // The user who owns this list
  followers: Set<User> = new Set(); // Set of followers
  followings: Set<User> = new Set(); // Set of followings
  section: string = "default"; // The current section

  constructor(private route: ActivatedRoute, private router: NavController, private storage: StorageService, private userService: UserService, private followService: FollowService) {

  }

  private generateUsers() {

    // Retrieves users

    this.followService.getFollowings(this.current_user!.user_id).subscribe(response =>

      response.users?.forEach(current =>
        this.followings.add(current))

    );
    this.followService.getFollowers(this.current_user!.user_id).subscribe(response =>

      response.users?.forEach(current =>
        this.followers.add(current)
      )

    );

  }

  ionViewWillEnter() {

    // Handles refresh

    const id_obj = this.route.snapshot.paramMap.get("id");
    const id: number = Number.parseInt(id_obj != null ? id_obj : "0");
    if (id == null || !id) {

      this.storage.getSessionUser().then((r) => {

        this.current_user = <User>r;
        this.generateUsers();

      });

    } else {

      this.userService.getOne({ user_id: id }).subscribe(r => {

        this.current_user = r.user;
        this.generateUsers();

      })
    }


  }

  goBack() {

    // Goes back to the previous page
    this.router.pop();

  }

}
