import { Component, DoCheck, OnInit } from '@angular/core';
import { StorageService } from '../apis/storage.service';
import { Thought } from '../models/thoughts-model';
import { User } from '../models/users-model';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements DoCheck {

  user?: User;
  thought: Thought = {

    content: "",
    likes: 0,
    opinions: 0,
    owner_id: -1,
    platons: 0,
    root_id: -1,
    thought_id: -1,
    share_date: new Date(),
    type: 0

  }
  constructor(private storageService: StorageService) { }

  ngDoCheck(): void {
    console.log(this.thought);
  }

  ionViewWillEnter() {

    this.storageService.get<User>("loggedInUser").then(r => {
      this.user = r
      this.thought.owner_id = this.user!.user_id;
    });
  }

}
