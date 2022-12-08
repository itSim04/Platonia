import { Component, AfterViewInit, Input, ViewChild, Injector } from "@angular/core";
import { IonPopover, AlertController } from "@ionic/angular";
import { ExitCodes } from "src/app/helper/constants/db_schemas";
import { formatRemainingDate } from "src/app/helper/utility";
import { AnswerService } from "src/app/linking/apis/answer.service";
import { LikeService } from "src/app/linking/apis/like.service";
import { StorageService } from "src/app/linking/apis/storage.service";
import { ThoughtService } from "src/app/linking/apis/thought.service";
import { ImageThought, PollThought, TextThought, Thought, VideoThought } from "src/app/linking/models/thought-main";
import { User } from "src/app/linking/models/user-main";


@Component({
  selector: 'app-card-thought',
  templateUrl: './thought-card.component.html',
  styleUrls: ['./thought-card.component.scss'],
})
export class ThoughtCardComponent implements AfterViewInit {


  session_user?: User;
  @Input() user?: User;
  @Input() thought?: Thought;

  @Input() content?: string;
  @Input() type?: number;

  @Input() poll1?: string;
  @Input() poll2?: string;
  @Input() poll3?: string;
  @Input() poll4?: string;

  editable?: boolean;
  date: string = "1970-01-01";
  deleted: boolean = false;


  isLikesOpen: boolean = false;
  likes: Array<User> = new Array;

  @ViewChild('options') option!: IonPopover;

  constructor(private injector: Injector, private thoughtService: ThoughtService, private alertController: AlertController, private optionService: AnswerService, private storageService: StorageService, private likeService: LikeService) {
  }

  ngAfterViewInit(): void {

    if (this.thought == undefined) {

      switch (this.type) {


        case 2:

          this.thought = new ImageThought(this.injector, this.content!);
          break;

        case 3:

          this.thought = new VideoThought(this.injector, this.content!);
          break;

        case 4:

          this.thought = new PollThought(this.injector, this.content!, 0, this.poll1!, this.poll2!, this.poll3!, this.poll4!, 0, 0, 0, 0);
          break;

        default:

          this.thought = new TextThought(this.injector, this.content!);
          break;

      }
      this.thought.share_date = new Date();
      this.thought.type = this.type!;

    }

    this.date = formatRemainingDate(this.thought.share_date);
    this.storageService.get<User>("loggedInUser").then(r => {

      this.session_user = r;
      if (this.thought?.owner_id == -1) this.thought.owner_id = r.user_id;

    });

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
      this.thoughtService.delete({ thought_id: this.thought!.thought_id }).subscribe(d => {

        this.deleted = d.status == ExitCodes.THOUGHTS_DELETE;

      });

    }

  }



  incrementPoll(position: number) {

    this.pollThought.incrementPoll(position);

    this.optionService.answer_poll(this.session_user!.user_id, this.thought!.thought_id, position).subscribe(p => {

      if (p.status != ExitCodes.POLLS_ANSWER_POLL) {

        this.pollThought.option_chosen = 0;
        this.pollThought.decrementPoll(position);

      }
    });
  }

  async setLikesOpen(state: boolean) {

    this.isLikesOpen = state;
    if (state) {

      this.likeService.getLikesOnThought(this.thought!.thought_id).subscribe(r => {

        this.likes.splice(0);
        r.users?.forEach(u => this.likes.unshift(u));

      });
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
