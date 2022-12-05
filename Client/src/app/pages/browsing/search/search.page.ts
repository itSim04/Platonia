import { Component, OnInit } from '@angular/core';
import { InterestService } from '../../../linking/apis/interest.service';
import { StorageService } from '../../../linking/apis/storage.service';
import { UserService } from '../../../linking/apis/user.service';
import { Interest } from '../../../linking/models/interests-model';
import { User } from '../../../linking/models/users-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  complete_users: Array<User> = new Array();
  users: Array<User> = new Array();

  complete_interests: Array<Interest> = new Array();
  interests: Array<Interest> = new Array();

  section: string = "default";
  constructor(private userService: UserService, private storageService: StorageService, private interestService: InterestService) { }

  ngOnInit(): void {

    this.userService.getAll().subscribe(r => r.users?.forEach(u => {

      this.complete_users.splice(0);
      this.complete_users.push(u);
      this.users.push(u);

    }));


    this.storageService.get<User>("loggedInUser").then(u => {

      this.interestService.getAll({ user_id: u.user_id }).subscribe(r => {

        r.interests?.forEach(u => {

          this.complete_interests.splice(0);
          this.complete_interests.push(u);
          this.interests.push(u);

        });
      });
    });

  }

  handleChange(event: any) {

    const query = event.target.value.toLowerCase();

    if (this.section == "default") {

      this.users = this.complete_users.filter(r => r.username.toLowerCase().indexOf(query) > -1);

    } else {

      this.interests = this.complete_interests.filter(r => r.name.toLowerCase().indexOf(query) > -1);

    }
  }

}
