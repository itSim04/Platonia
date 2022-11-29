import { Component, OnInit } from '@angular/core';
import { UserService } from '../apis/user.service';
import { User } from '../models/users-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  complete_users: Array<User> = new Array();
  users: Array<User> = new Array();
  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getAll().subscribe(r => r.users?.forEach(u => {

        this.complete_users.push(u);
        this.users.push(u);

      }));

  }

  handleChange(event: any) {

    const query = event.target.value.toLowerCase();
    this.users = this.complete_users.filter(r => r.username.toLowerCase().indexOf(query) > -1);

  }

}
