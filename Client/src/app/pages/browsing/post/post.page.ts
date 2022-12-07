import { Component, DoCheck, OnInit } from '@angular/core';
import { StorageService } from '../../../linking/apis/storage.service';
import { ThoughtService } from '../../../linking/apis/thought.service';
import { UserService } from '../../../linking/apis/user.service';
import { Thought, ThoughtRequest } from '../../../linking/models/thoughts-model';
import { User } from '../../../linking/models/users-request';

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
    option_chosen: 0,

    poll1: "Choice 1...",
    poll2: "Choice 2...",
    poll3: "Choice 3...",
    poll4: "Choice 4...",

    votes1: 0,
    votes2: 0,
    votes3: 0,
    votes4: 0,

    votes: 0

  }
  constructor(private storageService: StorageService, private thoughtService: ThoughtService) { }

  ionViewWillEnter() {

    this.storageService.get<User>("loggedInUser").then(r => {
      this.user = r
      this.thought.owner_id = this.user!.user_id;
    });
  }

  setType(mode: number) {

    this.thought.type = mode;

  }


  post() {

    const upload: ThoughtRequest = {

      content: this.thought.content,
      type: this.thought.type,
      owner_id: this.thought.owner_id,


    }

    if (this.thought.poll1 != undefined) upload.poll1 = this.thought.poll1;
    if (this.thought.poll2 != undefined) upload.poll2 = this.thought.poll2;
    if (this.thought.poll3 != undefined) upload.poll3 = this.thought.poll3;
    if (this.thought.poll4 != undefined) upload.poll4 = this.thought.poll4;

    this.thoughtService.addThought(upload).subscribe(r => console.log(r));

  }

}
