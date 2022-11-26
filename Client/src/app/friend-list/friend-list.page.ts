import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Console } from 'console';
import { FollowService } from '../apis/follow.service';
import { StorageService } from '../apis/storage.service';
import { UserService } from '../apis/user.service';
import { User } from '../models/users-model';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.page.html',
  styleUrls: ['./friend-list.page.scss'],
})
export class FriendListPage implements OnInit {

  current_user?: User;
  followers: Set<User> = new Set();
  followings: Set<User> = new Set();
  section: string = "default";

  constructor(route: ActivatedRoute, private router: Router, private storage: StorageService, private userService: UserService, private followService: FollowService) {

    const id_obj = route.snapshot.paramMap.get("id");
    const id: number = Number.parseInt(id_obj != null ? id_obj : "0");
    if (id == null || !id) {

      this.storage.get("loggedInUser").then((r) => {

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

  private generateUsers() {

    console.log("FOLL");
    this.followService.getFollowings(this.current_user!.user_id).subscribe(response =>

      response.users?.forEach(current =>
        this.followings.add(current))

    );
    this.followService.getFollowers(this.current_user!.user_id).subscribe(response =>


      response.users?.forEach(current =>
        this.followers.add(current)
      )

    );
    console.log(this.followings);
    console.log(this.followers);

  }

  public openProfile(user: User) {

    this.router.navigate(["/profile", { id: user.user_id }]);


  }

  ngOnInit() {
  }

}
