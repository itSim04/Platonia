import { Component, OnInit } from '@angular/core';
import { FollowService } from '../apis/follow.service';
import { StorageService } from '../apis/storage.service';
import { ThoughtService } from '../apis/thought.service';
import { Thought } from '../models/thoughts-model';
import { User } from '../models/users-model';
import { sortedInsertion } from '../helper/utility';

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

  ionViewWillEnter() {

    this.storageService.get<User>("loggedInUser").then(owner => {

      this.owner = owner;

      this.followService.getFollowings(owner.user_id).subscribe(followings => {

        this.thoughts.splice(0);
        followings.users?.forEach(user => {

          this.users?.set(user.user_id, user);

          this.thoughtService.getBy({ user_id: owner.user_id, owner_id: user.user_id }).subscribe(r => {

            r.thoughts?.forEach(t => this.thoughts.splice(sortedInsertion<Thought>(

              this.thoughts, t, (a: Thought, b: Thought) => { return (b.share_date.getTime() - a.share_date.getTime()); }), 0, t));

          });

        });

      });

    })

  }


}


