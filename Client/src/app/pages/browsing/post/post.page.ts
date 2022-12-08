import { Component } from '@angular/core';
import { ThoughtRequest } from 'src/app/linking/models/request-models';
import { Thought } from 'src/app/linking/models/thought-main';
import { User } from 'src/app/linking/models/user-main';
import { StorageService } from '../../../linking/apis/storage.service';
import { ThoughtService } from '../../../linking/apis/thought.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage {

  user?: User;

  thought_display?: Thought;

  type?: number = 0;
  content?: string;

  poll1?: string;
  poll2?: string;
  poll3?: string;
  poll4?: string;

  constructor(private storageService: StorageService, private thoughtService: ThoughtService) { }

  ionViewWillEnter() {

    this.storageService.getSessionUser().then(user => {

      this.user = user;

    });
  }

  setType(mode: number) {

    this.type = mode;

  }

  post() {

    const upload: ThoughtRequest = {

      content: this.content,
      type: this.type,
      owner_id: this.user?.user_id

    }

    if (this.poll1 != undefined) upload.poll1 = this.poll1;
    if (this.poll2 != undefined) upload.poll2 = this.poll2;
    if (this.poll3 != undefined) upload.poll3 = this.poll3;
    if (this.poll4 != undefined) upload.poll4 = this.poll4;

    this.thoughtService.addThought(upload).subscribe();

  }

}
