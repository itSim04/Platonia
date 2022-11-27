import { Component, OnInit } from '@angular/core';
import { StorageService } from '../apis/storage.service';
import { Thought } from '../models/thoughts-model';
import { User } from '../models/users-model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {

  user?: User;
  thought: Thought = {

    content: "Lorem Ipsum Dolor Sit",
    likes: 12,
    opinions: 23,
    owner_id: 9,
    platons: 24,
    root_id: 0,
    thought_id: 0,
    share_date: new Date(),
    type: 0

  }
  constructor(private storageService: StorageService) { }

  ionViewWillEnter() {

    this.storageService.get<User>("loggedInUser").then(r =>

      this.user = r

    );

  }

}
