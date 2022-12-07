import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonPopover, ModalController } from '@ionic/angular';
import { exitCode } from 'process';
import { AnswerService } from 'src/app/linking/apis/answer.service';
import { LikeService } from 'src/app/linking/apis/like.service';
import { StorageService } from 'src/app/linking/apis/storage.service';
import { ThoughtService } from 'src/app/linking/apis/thought.service';
import { ExitCodes } from 'src/app/helper/constants/db_schemas';
import { formatRemainingDate } from 'src/app/helper/utility';
import { Thought } from 'src/app/linking/models/thoughts-model';
import { User } from 'src/app/linking/models/users-request';

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

  max: number = 0;
  max_index: number = 0;

  isLikesOpen: boolean = false;
  likes: Array<User> = new Array;

  @ViewChild('options') option!: IonPopover;

  constructor(private thoughtService: ThoughtService, private alertController: AlertController, private optionService: AnswerService, private storageService: StorageService, private likeService: LikeService) {
  }

  ngAfterViewInit(): void {

    this.date = formatRemainingDate(this.thought.share_date);
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

        if (this.thought.votes1! > this.max) {

          this.max = this.thought.votes1!;
          this.max_index = 1;

        }

        if (this.thought.votes2! > this.max) {

          this.max = this.thought.votes2!
            ;
          this.max_index = 2;

        }

        if (this.thought.votes3! > this.max) {

          this.max = this.thought.votes3!;
          this.max_index = 3;

        }

        if (this.thought.votes4! > this.max) {

          this.max = this.thought.votes4!;
          this.max_index = 4;

        }

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
      this.thoughtService.delete({ thought_id: this.thought.thought_id }).subscribe(d => { 
        
        this.deleted = d.status == ExitCodes.THOUGHTS_DELETE; 
      
      });

    }

  }



  incrementPoll(position: number) {

    if (this.thought.option_chosen == 0) {

      this.thought.option_chosen = position;
      this.thought.votes!++;
      switch (position) {

        case 1:

          this.thought.votes1!++;
          break;

        case 2:

          this.thought.votes2!++;
          break;

        case 3:

          this.thought.votes3!++;
          break;

        case 4:

          this.thought.votes4!++;
          break;

      }

      if (this.thought.votes1! > this.max) {

        this.max = this.thought.votes1!;
        this.max_index = 1;

      }

      if (this.thought.votes2! > this.max) {

        this.max = this.thought.votes2!
          ;
        this.max_index = 2;

      }

      if (this.thought.votes3! > this.max) {

        this.max = this.thought.votes3!;
        this.max_index = 3;

      }

      if (this.thought.votes4! > this.max) {

        this.max = this.thought.votes4!;
        this.max_index = 4;

      }

      this.optionService.answer_poll(this.session_user!.user_id, this.thought.thought_id, position).subscribe(p => {

        if (p.status != ExitCodes.POLLS_ANSWER_POLL) {

          this.thought.option_chosen = 0;
          this.thought.votes!--;
          switch (position) {

            case 1:

              this.thought.votes1!--;
              break;

            case 2:

              this.thought.votes2!--;
              break;

            case 3:

              this.thought.votes3!--;
              break;

            case 4:

              this.thought.votes4!--;
              break;

          }

          if (this.thought.votes1! > this.max) {

            this.max = this.thought.votes1!;
            this.max_index = 1;

          }

          if (this.thought.votes2! > this.max) {

            this.max = this.thought.votes2!
              ;
            this.max_index = 2;

          }

          if (this.thought.votes3! > this.max) {

            this.max = this.thought.votes3!;
            this.max_index = 3;

          }

          if (this.thought.votes4! > this.max) {

            this.max = this.thought.votes4!;
            this.max_index = 4;

          }

        }

      });
    }
  }

  updatePollSubject(e: string, position: number) {


    switch (position) {

      case 1:

        this.thought.poll1 = e;

        break;

      case 2:

        this.thought.poll2 = e;

        break;

      case 3:

        this.thought.poll3 = e;

        break;

      case 4:

        this.thought.poll4 = e;

        break;


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

}
