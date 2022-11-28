import { Component, DoCheck, OnInit } from '@angular/core';
import { StorageService } from '../apis/storage.service';
import { ThoughtService } from '../apis/thought.service';
import { UserService } from '../apis/user.service';
import { Thought, THOUGHTS_RESPONSE } from '../models/thoughts-model';
import { User } from '../models/users-model';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage {

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
    type: 0,
    is_liked: false,
    is_platoned: false,
    option_chosen: 0

  }
  constructor(private storageService: StorageService, private thoughtService: ThoughtService) { }

  ionViewWillEnter() {

    this.storageService.get<User>("loggedInUser").then(r => {
      this.user = r
      this.thought.owner_id = this.user!.user_id;
    });
  }

  post() {

    const upload: THOUGHTS_RESPONSE = {

      content: this.thought.content,
      type: this.thought.type,
      owner_id: this.thought.owner_id

    }
    this.thoughtService.addThought(upload).subscribe(r => console.log(r));

  }

}
