import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  followers?: Map<number, User>;
  followings?: Map<number, User>;
  constructor(route: ActivatedRoute, storage: StorageService, userService: UserService) {

    // const id_obj = route.snapshot.paramMap.get("id");
    // const id: number = Number.parseInt(id_obj != null ? id_obj : "0");
    // if (id == null || !id) {

    //   storage.get("loggedInUser").then((r) => {

    //     this.current_user = <User>r;

    //   });

    // } else {

    //     userService.getOne({ user_id: id }).subscribe(r => {

    //     this.current_user = r.user;

    //   })

    // }

  }

  ngOnInit() {
  }

}
