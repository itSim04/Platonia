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

  // Represents the feed of Thoughts
  owner?: User; // The logged in user
  users?: Map<number, User> = new Map(); // The users with Posts on the feed
  thoughts: Array<Thought> = new Array(); // The thoughts on the feed
  anchor: number = 0; // Start of pagination
  quantity: number = 5; // Batch of pagination

  loading: boolean = true; // Whether the feed is loading
  constructor(private router: Router, private route: ActivatedRoute, private thoughtService: ThoughtService, private storageService: StorageService, private followService: FollowService) { }


  // Handles refreshing the feed
  async handleRefresh(event: any) {
    setTimeout(() => {
      this.resetData();
      event.target.complete();
    }, 2000);
  };

  resetData() {

    // Retrieves data again from the start of the database

    console.log("RESET");
    this.users?.clear();
    this.anchor = 0;
    this.retrieveData(true);
  }

  retrieveData(flag: boolean) {

    // Retrieves data from the anchor

    this.storageService.getSessionUser().then(owner => {

      this.owner = owner;

      this.followService.getFollowings(owner.user_id).subscribe(followings => {

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
              
            });

          });

      });

    });

  }

  ngOnInit() {

    // Handles initialization

    this.resetData();

  }

  ionViewWillEnter() {

    // Handles urgent refresh
    this.storageService.getRefreshFlag().then(r => {
      if (r) {

        this.resetData();

      }
    });

  }

  onIonInfinite(ev: any) {

    // Handles scrolling 
    this.anchor += this.quantity;
    this.retrieveData(false);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }


}


