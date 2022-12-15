import { ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExitCodes } from 'src/app/helper/constants/db_schemas';
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

  loading: boolean = false;

  thought_display?: Thought;

  type: number = 0;
  content: string = "";

  media?: string;

  poll1?: string;
  poll2?: string;
  poll3?: string;
  poll4?: string;

  constructor(private toastController: ToastController, private storageService: StorageService, private thoughtService: ThoughtService, private router: Router) { }

  ionViewWillEnter() {

    this.storageService.getSessionUser().then(user => {

      this.user = user;

    });
  }

  setType(mode: number) {

    this.type = mode;

  }

  async missing() {

    const toast = await this.toastController.create({
      message: "Unimplemented Feature",
      duration: 1500,
      icon: 'globe'
    });

    await toast.present();

  }

  post() {

    this.loading = true;
    const upload: ThoughtRequest = {

      content: this.content,
      type: this.type,
      owner_id: this.user?.user_id

    }

    if (this.type == 1) {
      if (this.media != undefined) upload.media = this.media;
    }

    if (this.type == 3) {
      if (this.poll1 != undefined) upload.poll1 = this.poll1;
      if (this.poll2 != undefined) upload.poll2 = this.poll2;
      if (this.poll3 != undefined) upload.poll3 = this.poll3;
      if (this.poll4 != undefined) upload.poll4 = this.poll4;
    }

    this.thoughtService.addThought(upload).subscribe(r => {

      console.log(r);
      if (r.status == ExitCodes.THOUGHTS_ADD) {

        this.loading = false;
        this.storageService.setRefreshFlag(true).then(r => this.router.navigate(["tabs/feed/"]));

      }


    });

  }

}
