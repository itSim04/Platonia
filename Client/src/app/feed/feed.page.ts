import { Component, OnInit } from '@angular/core';
import { StorageService } from '../apis/storage.service';
import { ThoughtService } from '../apis/thought.service';
import { Thought } from '../models/thoughts-model';
import { User } from '../models/users-model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {

  owner?: User;
  users?: Map<number, User>;
  thoughts: Array<Thought> = new Array();
  constructor(private thoughtService: ThoughtService, private storageService: StorageService) { }

  ionViewWillEnter() {

    this.storageService.get<User>("loggedInUser").then(u => {

      this.owner = u;
      this.thoughtService.getAll({ user_id: this.owner.user_id }).subscribe(r => {
        this.thoughts.splice(0);
        this.users = r.users;
        r.thoughts?.forEach(t => this.thoughts?.unshift(t));
      });
      console.log(this.users);

    });


  }

}
