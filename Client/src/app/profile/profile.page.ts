import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../apis/storage.service';
import { UserService } from '../apis/user.service';
import { User } from '../models/users-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  current_user?: User;
  constructor(private storage: StorageService, private userService: UserService, private route: ActivatedRoute) {

    const id_obj = route.snapshot.paramMap.get("id");
    const id: number = Number.parseInt(id_obj != null ? id_obj : "0");
    if (id == null || !id) {

      this.storage.get("loggedInUser").then((r) => {

        this.current_user = <User>r;
        this.current_user.picture = `http://localhost/Platonia/Server/assets/${this.current_user.user_id}/profile.png`;

      });

    } else {

      this.userService.getOne({ user_id: id }).subscribe(r => {

        this.current_user = r.user;
        if (this.current_user != undefined) this.current_user.picture = `http://localhost/Platonia/Server/assets/${id}/profile.png`;

      })

    }

  }



}
