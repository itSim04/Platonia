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

  // Class that holds a Thought. The user can like, platon and express. The user could answer. The owner can delete

  session_user?: User; // The logged in User
  
  original?: User; // Holds the original owner of the thought (If this thought is Platoned)
  @Input() user?: User; // Holds the owner of the thought
  @Input() thought?: Thought; // Holds the thought this class represents

  @Output() refresh: EventEmitter<boolean> = new EventEmitter(); // Emitted when the Thought should refresh

  date: string = "1970-01-01"; // The date of the thought in readable format
  deleted: boolean = false; // Whether the thought was deleted

  opinion: string = ""; // The opinion being currently typed
  isOpinionsOpen: boolean = false; // Whether the opinions are open
  opioners: Map<number, User> = new Map(); // The users that expressed
  opinions: Array<TextThought> = new Array(); // The opinions on this thought

  isLikesOpen: boolean = false; // Whether the like list is open
  likes: Array<User> = new Array; // The likes on this thought

  @ViewChild('options') option!: IonPopover; // The opinion page

  constructor(public thoughtService: ThoughtService, private userService: UserService, private alertController: AlertController, public optionService: AnswerService, public storageService: StorageService, public likeService: LikeService, public platonService: PlatonService) {
  }

  ngAfterViewInit(): void {

    // Formats the date in readable format
    this.date = formatRemainingDate(this.thought!.share_date);

    // Retrieves the logged in user
    this.storageService.getSessionUser().then(r => {

      this.session_user = r;
      if (this.thought?.owner_id == -1) this.thought.owner_id = r.user_id;

    });

    // Checks if the thought is platoned
    if (this.thought?.type == 4) {

      this.userService.getOne({ user_id: this.platonedThought.root.owner_id }).subscribe(r => {

        this.original = r.user;
      });

    }

  }

  openOptions() {

    // Opens the Opinion list

    if (this.option.isOpen) {

      this.option.dismiss();


    } else {

      this.option.present();

    }

  }

  async delete() {

    // Deletes the thought

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

    // Opens the like list

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

    // Opens the opinion list
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

    // Platons/Unplatons the thought
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

    // Expresses an Opinion
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

    // Deletes an Opinion
    this.thought!.deleteComment(id, this.thoughtService).subscribe(r => {

      console.log(r);
      if (r.status == ExitCodes.THOUGHTS_DELETE) {
        this.setOpinionsOpen(true);
      } else {
        this.thought!.opinions++;
      }
    })

  }


  // Getters that cast the Thoughts for easier use
  
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
