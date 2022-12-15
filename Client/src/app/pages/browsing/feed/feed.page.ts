import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FollowService } from '../../../linking/apis/follow.service';
import { StorageService } from '../../../linking/apis/storage.service';
import { ThoughtService } from '../../../linking/apis/thought.service';
import { Thought } from '../../../linking/models/thought-main';
import { User } from '../../../linking/models/user-main';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  owner?: User;
  users?: Map<number, User> = new Map();
  thoughts: Array<Thought> = new Array();
  anchor: number = 0;
  quantity: number = 5;

  loading: boolean = true;
  constructor(private router: Router, private route: ActivatedRoute, private thoughtService: ThoughtService, private storageService: StorageService, private followService: FollowService) { }

  async handleRefresh(event: any) {
    setTimeout(() => {
      this.resetData();
      event.target.complete();
    }, 2000);
  };

  resetData() {
    console.log("RESET");
    this.users?.clear();
    this.anchor = 0;
    this.retrieveData(true);
  }

  retrieveData(flag: boolean) {

    this.storageService.getSessionUser().then(owner => {

      this.owner = owner;

      this.followService.getFollowings(owner.user_id).subscribe(followings => {

        // if (!followings.users?.size) {
        //   this.loading = false;
        // } else {

          followings.users!.forEach((k, u) => this.users?.set(u, k));

          
          this.users?.set(owner.user_id, owner);

          const ids: number[] = Array.from(followings.users!.values()).map(r => r.user_id);
          ids.push(owner.user_id);
          this.thoughtService.getByUsers({ user_id: owner.user_id, owner_ids: ids, offset: this.anchor, quantity: this.quantity }).subscribe(r => {

            this.loading = false;
            if (flag)
              this.thoughts.splice(0);
            r.thoughts?.forEach(t => {
              this.thoughts.push(t);
              //console.log("FEED", t);
              
            });

          });

        // }
      });

    });

  }

  ngOnInit() {

    this.resetData();

  }

  ionViewWillEnter() {

    this.storageService.getRefreshFlag().then(r => {
      if (r) {

        this.resetData();

      }
    });

  }

  onIonInfinite(ev: any) {
    this.anchor += this.quantity;
    this.retrieveData(false);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }


}


