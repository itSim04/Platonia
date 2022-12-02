import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AnswerService } from 'src/app/apis/answer.service';
import { LikeService } from 'src/app/apis/like.service';
import { StorageService } from 'src/app/apis/storage.service';
import { EXIT_CODES } from 'src/app/helper/constants/db_schemas';
import { Thought } from 'src/app/models/thoughts-model';
import { User } from 'src/app/models/users-model';

@Component({
  selector: 'app-card-thought',
  templateUrl: './thought-card.component.html',
  styleUrls: ['./thought-card.component.scss'],
})
export class ThoughtCardComponent implements OnInit {

  session_user?: User;
  @Input() user?: User;
  @Input() thought!: Thought;
  @Input() editable?: boolean;

  isLikesOpen: boolean = false;
  likes: Array<User> = new Array;

  constructor(private optionService: AnswerService, private storageService: StorageService, private likeService: LikeService) {
  }

  ngOnInit(): void {
    this.storageService.get<User>("loggedInUser").then(r => this.session_user = r);
    if (this.thought.type == 3) {
      this.optionService.get_option(this.thought.thought_id).subscribe(response => {

        this.thought.votes1 = response.options!.get(1)?.votes;
        this.thought.votes2 = response.options!.get(2)?.votes;
        this.thought.votes3 = response.options!.get(3)?.votes;
        this.thought.votes4 = response.options!.get(4)?.votes;

        this.thought.poll1 = response.options!.get(1)?.content;
        this.thought.poll2 = response.options!.get(2)?.content;
        this.thought.poll3 = response.options!.get(3)?.content;
        this.thought.poll4 = response.options!.get(4)?.content;

        this.thought.votes = this.thought.votes1! + this.thought.votes2! + this.thought.votes3! + this.thought.votes4!;

      });
    }
  }

  round(n: number): number {

    return Math.round(n);

  }

  async setLikesOpen(state: boolean) {
    this.isLikesOpen = state;
    if (state) {
      this.likeService.getLikesOnThought(this.thought.thought_id).subscribe(r => {

        this.likes.splice(0);
        r.users?.forEach(u => this.likes.unshift(u));

      });
    }
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
