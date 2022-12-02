import { Component, OnInit } from '@angular/core';
import { FollowService } from '../apis/follow.service';
import { StorageService } from '../apis/storage.service';
import { ThoughtService } from '../apis/thought.service';
import { Thought } from '../models/thoughts-model';
import { User } from '../models/users-model';
import { sortedInsertion } from '../helper/utility';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {

  owner?: User;
  users?: Map<number, User> = new Map();
  thoughts: Array<Thought> = new Array();
  constructor(private thoughtService: ThoughtService, private storageService: StorageService, private followService: FollowService) { }

  async handleRefresh(event: any) {
    await setTimeout(() => {
      this.retrieveDate();
      event.target.complete();
    }, 2000);
  };

  retrieveDate() {

    this.storageService.get<User>("loggedInUser").then(owner => {

      this.owner = owner;

      this.followService.getFollowings(owner.user_id).subscribe(followings => {

        this.thoughts.splice(0);

        const temp_thoughts: Array<Thought> = new Array();
        this.users = followings.users;

        const ids: number[] = Array.from(followings.users!.values()).map(r => r.user_id);
        ids.push(owner.user_id);
        console.log(ids);
        this.thoughtService.getByUsers({ user_id: owner.user_id, owner_ids: ids}).subscribe(r => {

          console.log(r);
          r.thoughts?.forEach(t => temp_thoughts.unshift(t));

        });
        this.thoughts = temp_thoughts.sort((a: Thought, b: Thought) => { return (b.share_date.getTime() < a.share_date.getTime() ? -1 : 1); });
        console.log(this.thoughts);


      });

    });

  }

  ionViewWillEnter() {

    this.retrieveDate();

  }

  onIonInfinite(ev: any) {
    //this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }


}


