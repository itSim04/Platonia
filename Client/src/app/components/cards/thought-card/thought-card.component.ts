import { PlatonService } from './../../../linking/apis/platon.service';
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

  date: string = "1970-01-01";
  deleted: boolean = false;

  opinion: string = "";
  isOpinionsOpen: boolean = false;
  opioners: Map<number, User> = new Map();
  opinions: Array<TextThought> = new Array();

  isLikesOpen: boolean = false;
  likes: Array<User> = new Array;

  @ViewChild('options') option!: IonPopover;

  constructor(public thoughtService: ThoughtService, private alertController: AlertController, public optionService: AnswerService, public storageService: StorageService, public likeService: LikeService, public platonService: PlatonService) {
  }

  ngAfterViewInit(): void {

    this.date = formatRemainingDate(this.thought!.share_date);
    this.storageService.getSessionUser().then(r => {

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

  async setLikesOpen(state: boolean) {

    this.isLikesOpen = state;
    if (state) {

      this.likeService.getLikesOnThought(this.thought!.thought_id).subscribe(r => {

        this.likes.splice(0);
        r.users?.forEach(u => this.likes.unshift(u));
        console.log(r);

      });
    }
  }

  setOpinionsOpen(state: boolean) {

    this.isOpinionsOpen = state;
    if (state) {

      this.thoughtService.getAll({ user_id: this.session_user?.user_id, root_id: this.thought!.thought_id }).subscribe(r => {

        console.log(r);
        this.opinions.splice(0);
        r.users?.forEach(u => this.opioners.set(u.user_id, u));
        r.thoughts?.forEach(t => this.opinions.unshift(t as TextThought));

      });
    }
  }

  postComment() {

    this.thought!.postComment(this.opinion, this.session_user!.user_id, this.thoughtService).subscribe(r => {

      if (r.status == ExitCodes.THOUGHTS_ADD) {
        this.setOpinionsOpen(true);
        this.opinion = "";
      } else {
        this.thought!.opinions--;
      }
    })

  }

  deleteComment(id: number) {

    this.thought!.deleteComment(id, this.thoughtService).subscribe(r => {

      console.log(r);
      if (r.status == ExitCodes.THOUGHTS_DELETE) {
        this.setOpinionsOpen(true);
      } else {
        this.thought!.opinions++;
      }
    })

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

  get imageThought(): ImageThought {

    return this.thought as ImageThought;

  }

  set imageThought(imageThought: ImageThought) {

    this.thought = imageThought;

  }

}
