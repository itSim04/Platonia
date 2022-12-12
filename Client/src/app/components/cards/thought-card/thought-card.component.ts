import { UserService } from './../../../linking/apis/user.service';
import { PlatonedThought } from './../../../linking/models/thought-main';
import { PlatonService } from './../../../linking/apis/platon.service';
import { Component, AfterViewInit, Input, ViewChild, Injector, Output, EventEmitter } from "@angular/core";
import { IonPopover, AlertController } from "@ionic/angular";
import { ExitCodes } from "src/app/helper/constants/db_schemas";
import { formatRemainingDate } from "src/app/helper/utility";
import { AnswerService } from "src/app/linking/apis/answer.service";
import { LikeService } from "src/app/linking/apis/like.service";
import { StorageService } from "src/app/linking/apis/storage.service";
import { ThoughtService } from "src/app/linking/apis/thought.service";
import { ImageThought, PollThought, TextThought, Thought, VideoThought } from "src/app/linking/models/thought-main";
import { User } from "src/app/linking/models/user-main";
import { threadId } from 'worker_threads';


@Component({
  selector: 'app-card-thought',
  templateUrl: './thought-card.component.html',
  styleUrls: ['./thought-card.component.scss'],
})
export class ThoughtCardComponent implements AfterViewInit {

  session_user?: User;
  original?: User;
  @Input() user?: User;
  @Input() thought?: Thought;

  @Output() refresh: EventEmitter<boolean> = new EventEmitter();

  date: string = "1970-01-01";
  deleted: boolean = false;

  opinion: string = "";
  isOpinionsOpen: boolean = false;
  opioners: Map<number, User> = new Map();
  opinions: Array<TextThought> = new Array();

  isLikesOpen: boolean = false;
  likes: Array<User> = new Array;

  @ViewChild('options') option!: IonPopover;

  constructor(public thoughtService: ThoughtService, private userService: UserService, private alertController: AlertController, public optionService: AnswerService, public storageService: StorageService, public likeService: LikeService, public platonService: PlatonService) {
  }

  ngAfterViewInit(): void {

    this.date = formatRemainingDate(this.thought!.share_date);
    this.storageService.getSessionUser().then(r => {

      this.session_user = r;
      if (this.thought?.owner_id == -1) this.thought.owner_id = r.user_id;

    });
    if (this.thought?.type == 4) {

      this.userService.getOne({ user_id: this.platonedThought.root.owner_id }).subscribe(r => {

        this.original = r.user;
      });

    }

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

      this.likeService.getLikesOnThought(this.thought?.type == 4 ? this.platonedThought.root.thought_id : this.thought!.thought_id).subscribe(r => {

        this.likes.splice(0);
        r.users?.forEach(u => this.likes.unshift(u));
        console.log(r);

      });
    }
  }

  async setPlatonedLikesOpen(state: boolean) {

    this.isLikesOpen = state;
    if (state) {

      this.likeService.getLikesOnThought(this.thought?.type == 4 ? this.platonedThought.root.thought_id : this.thought!.thought_id).subscribe(r => {

        this.likes.splice(0);
        r.users?.forEach(u => this.likes.unshift(u));
        console.log(r);

      });
    }
  }

  setOpinionsOpen(state: boolean) {

    this.isOpinionsOpen = state;
    if (state) {

      this.thoughtService.getAll({ user_id: this.session_user?.user_id, root_id: (this.thought?.type == 4 ? this.platonedThought.root.thought_id : this.thought!.thought_id) }).subscribe(r => {

        console.log(r);
        this.opinions.splice(0);
        r.users?.forEach(u => this.opioners.set(u.user_id, u));
        r.thoughts?.forEach(t => this.opinions.unshift(t as TextThought));

      });
    }
  }

  togglePlaton() {

    if (this.thought?.type == 4) {
      this.platonedThought.root.togglePlaton(this.platonService, this.session_user?.user_id!).subscribe(r => {

        this.refresh.emit();

      });
    } else {
      this.thought!.togglePlaton(this.platonService, this.session_user?.user_id!).subscribe(r => {

        this.refresh.emit();

      });
    }

  }

  postComment() {

    if (this.thought?.type == 4) {
      this.platonedThought!.root.postComment(this.opinion, this.session_user!.user_id, this.thoughtService).subscribe(r => {

        if (r.status == ExitCodes.THOUGHTS_ADD) {
          this.setOpinionsOpen(true);
          this.opinion = "";
        } else {
          this.thought!.opinions--;
        }
      })
    } else {
      this.thought!.postComment(this.opinion, this.session_user!.user_id, this.thoughtService).subscribe(r => {

        if (r.status == ExitCodes.THOUGHTS_ADD) {
          this.setOpinionsOpen(true);
          this.opinion = "";
        } else {
          this.thought!.opinions--;
        }
      })
    }

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

  get platonedThought(): PlatonedThought {

    return this.thought as PlatonedThought;

  }

  set platonedThought(platonedThought: PlatonedThought) {

    this.thought = platonedThought;

  }

  get platonedText(): TextThought {

    return this.platonedThought.root as TextThought;

  }

  set platonedText(platonedText: TextThought) {

    this.platonedThought.root = platonedText;

  }

  get platonedImage(): ImageThought {

    return this.platonedThought.root as ImageThought;

  }

  set platonedImage(platonedImage: ImageThought) {

    this.platonedThought.root = platonedImage;

  }

  get platonedPoll(): PollThought {

    return this.platonedThought.root as PollThought;

  }

  set platonedPoll(platonedPoll: PollThought) {

    this.platonedThought.root = platonedPoll;

  }

}
