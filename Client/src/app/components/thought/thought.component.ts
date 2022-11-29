import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from 'src/app/apis/like.service';
import { StorageService } from 'src/app/apis/storage.service';
import { ThoughtService } from 'src/app/apis/thought.service';
import { EXIT_CODES } from 'src/app/constants';
import { Thought } from 'src/app/models/thoughts-model';
import { User } from 'src/app/models/users-model';

@Component({
  selector: 'app-thought',
  templateUrl: './thought.component.html',
  styleUrls: ['./thought.component.scss'],
})
export class ThoughtComponent implements OnInit {

  session_user?: User;
  @Input() user?: User;
  @Input() thought!: Thought;
  @Input() editable?: boolean;
  constructor(private storageService: StorageService, private likeService: LikeService) {
  }

  ngOnInit(): void {
    this.storageService.get<User>("loggedInUser").then(r => this.session_user = r);
  }

  like() {

    if (this.thought.is_liked) {
      this.thought.is_liked = false;
      this.thought.likes--;
      this.likeService.unlike(this.session_user!.user_id, this.thought.thought_id).subscribe(r => {
        
        console.log(r);
        if (r.status != EXIT_CODES.LIKE_REMOVE) {
          this.thought.is_liked = true;
          this.thought.likes++;
        }

      });


    } else {
      this.thought.is_liked = true;
      this.thought.likes++;
      this.likeService.like(this.session_user!.user_id, this.thought.thought_id).subscribe(r => {

        if (r.status != EXIT_CODES.LIKE_ADD) {
          this.thought.is_liked = false;
          this.thought.likes--;
        }

      })
    }
  }

}
