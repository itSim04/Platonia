import { ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExitCodes } from 'src/app/helper/constants/db_schemas';
import { ThoughtRequest } from 'src/app/linking/models/request-models';
import { Thought } from 'src/app/linking/models/thought-main';
import { User } from 'src/app/linking/models/user-main';
import { StorageService } from '../../../linking/apis/storage.service';
import { ThoughtService } from '../../../linking/apis/thought.service';
import { displayWarning } from 'src/app/helper/utility';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage {

  user?: User; // The logged in user

  loading: boolean = false; // Whether the page should be loading

  type: number = 0; // The type of the post
  content: string = ""; // The text content of the text thought

  media?: string; // The media of the image thought

  poll1?: string; // The first poll
  poll2?: string; // The second poll
  poll3?: string; // The third poll
  poll4?: string; // The fourth poll

  constructor (private toastController: ToastController, private storageService: StorageService, private thoughtService: ThoughtService, private router: Router) { }

  ionViewWillEnter() {

    // Retrieves the logged in user
    this.storageService.getSessionUser().then(user => {

      this.user = user;

    });
  }

  setType(mode: number) {

    // Updates the type of post
    this.type = mode;

  }

  async missing() {

    // (WIP) Handles unimplemented features
    const toast = await this.toastController.create({
      message: "Unimplemented Feature",
      duration: 1500,
      icon: 'globe'
    });

    await toast.present();

  }

  post() {

    // Posts a thought
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

    try {
      this.thoughtService.addThought(upload).subscribe(r => {

        console.log(r);
        if (r.status == ExitCodes.THOUGHTS_ADD) {

          this.loading = false;
          this.storageService.setRefreshFlag(true).then(r => this.router.navigate(["tabs/feed/"]));

        }


      });

    } catch (e) {

      this.loading = false
      displayWarning("Connection Error", this.toastController);

    }

  }

}
