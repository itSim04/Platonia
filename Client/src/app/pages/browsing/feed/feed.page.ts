import { Component, OnInit } from '@angular/core';
import { FollowService } from '../../../linking/apis/follow.service';
import { StorageService } from '../../../linking/apis/storage.service';
import { ThoughtService } from '../../../linking/apis/thought.service';
import { Thought } from '../../../linking/models/thoughts-model';
import { User } from '../../../linking/models/users-model';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

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
  constructor(private thoughtService: ThoughtService, private storageService: StorageService, private followService: FollowService) { }

  async handleRefresh(event: any) {
    await setTimeout(() => {
      this.thoughts.splice(0);
      this.users?.clear();
      this.anchor = 0;
      this.retrieveDate();
      event.target.complete();
    }, 2000);
  };

  retrieveDate() {

    this.storageService.get<User>("loggedInUser").then(owner => {

      this.owner = owner;

      this.followService.getFollowings(owner.user_id).subscribe(followings => {

        followings.users!.forEach((k, u) => this.users?.set(u, k));
        this.users?.set(owner.user_id, owner);

        const ids: number[] = Array.from(followings.users!.values()).map(r => r.user_id);
        ids.push(owner.user_id);
        this.thoughtService.getByUsers({ user_id: owner.user_id, owner_ids: ids, offset: this.anchor, quantity: this.quantity }).subscribe(r => {

          r.thoughts?.forEach(t => this.thoughts.push(t));

        });


      });

    });

  }

  ngOnInit() {

    this.retrieveDate();

  }

  onIonInfinite(ev: any) {
    this.anchor += this.quantity;
    this.retrieveDate();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }


}


