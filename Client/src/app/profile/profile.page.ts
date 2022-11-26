import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from '../apis/storage.service';
import { UserService } from '../apis/user.service';
import { User } from '../models/users-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  owner: boolean = false;
  current_user?: User;
  constructor(private storage: StorageService, private userService: UserService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {

    const id_obj = this.route.snapshot.paramMap.get("id");
    const id: number = Number.parseInt(id_obj != null ? id_obj : "0");
    if (id == null || !id) {

      this.storage.get("loggedInUser").then((r) => {

        this.current_user = <User>r;
        this.owner = true;

      });

    } else {

      this.userService.getOne({ user_id: id }).subscribe(r => {

        this.current_user = r.user;
        this.storage.get("loggedInUser").then(r => this.owner = (<User>r).user_id == this.current_user!.user_id);

      })

    }


  }


  public openFriendsList() {

    this.router.navigate(['/friend-list', { id: this.current_user?.user_id }]);

  }

  public logout() {

    this.storage.set("loggedInUser", undefined).then(r => this.router.navigate(['/login']));

  }

  public edit() {

    this.router.navigate(['/edit-profile']);

  }



}
