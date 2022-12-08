import { Component, AfterViewInit, Input, ViewChild } from "@angular/core";
import { IonPopover, AlertController } from "@ionic/angular";
import { ExitCodes } from "src/app/helper/constants/db_schemas";
import { formatRemainingDate } from "src/app/helper/utility";
import { AnswerService } from "src/app/linking/apis/answer.service";
import { LikeService } from "src/app/linking/apis/like.service";
import { StorageService } from "src/app/linking/apis/storage.service";
import { ThoughtService } from "src/app/linking/apis/thought.service";
import { PollThought, TextThought, Thought } from "src/app/linking/models/thought-main";
import { User } from "src/app/linking/models/user-main";


@Component({
  selector: 'app-card-thought',
  templateUrl: './thought-card.component.html',
  styleUrls: ['./thought-card.component.scss'],
})
export class ThoughtCardComponent implements AfterViewInit {


  session_user?: User;
  @Input() user?: User;
  @Input() thought!: Thought;
  @Input() editable?: boolean;
  date: string = "1970-01-01";
  deleted: boolean = false;


  isLikesOpen: boolean = false;
  likes: Array<User> = new Array;

  @ViewChild('options') option!: IonPopover;

  constructor(private thoughtService: ThoughtService, private alertController: AlertController, private optionService: AnswerService, private storageService: StorageService, private likeService: LikeService) {
  }

  ngAfterViewInit(): void {

    this.date = formatRemainingDate(this.thought.share_date);
    this.storageService.get<User>("loggedInUser").then(r => this.session_user = r);

  }

  openOptions() {

    if (this.option.isOpen) {

      this.option.dismiss();


    } else {

      this.option.present();

    }

  }

  async delete() {

    const alert = await this.alertController.create({
      header: 'Delete Thought',
      message: 'Are you sure you want to delete this Thought?',
      buttons: [{ role: "Delete", text: "Yes", cssClass: "alert-button-confirm" }, { text: "Cancel", cssClass: "alert-button-cancel" }],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role == 'Delete') {

      this.deleted = true;
      this.thoughtService.delete({ thought_id: this.thought.thought_id }).subscribe(d => {

        this.deleted = d.status == ExitCodes.THOUGHTS_DELETE;

      });

    }

  }



  incrementPoll(position: number) {

    this.pollThought.incrementPoll(position);

    this.optionService.answer_poll(this.session_user!.user_id, this.thought.thought_id, position).subscribe(p => {

      if (p.status != ExitCodes.POLLS_ANSWER_POLL) {

        this.pollThought.option_chosen = 0;
        this.pollThought.decrementPoll(position);

      }
    });
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
        if (r.status != ExitCodes.LIKE_REMOVE) {
          this.thought.is_liked = true;
          this.thought.likes++;
        }

      });


    } else {

      this.thought.is_liked = true;
      this.thought.likes++;
      this.likeService.like(this.session_user!.user_id, this.thought.thought_id).subscribe(r => {

        if (r.status != ExitCodes.LIKE_ADD) {
          this.thought.is_liked = false;
          this.thought.likes--;
        }

      })
    }
  }

  get textThought(): TextThought {

    return this.thought as TextThought;

  }

  set textThought(textThought: TextThought) {

    this.thought = textThought;

  }

  get pollThought(): PollThought {

    return this.thought as PollThought;

  }

  set pollThought(pollThought: PollThought) {

    this.thought = pollThought;

  }

}
