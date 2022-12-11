import { AfterViewInit } from '@angular/core';
import { TextThought } from './../../../linking/models/thought-main';
import { User } from './../../../linking/models/user-main';
import { Thought } from 'src/app/linking/models/thought-main';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatRemainingDate } from 'src/app/helper/utility';
import { LikeService } from 'src/app/linking/apis/like.service';
import { StorageService } from 'src/app/linking/apis/storage.service';

@Component({
  selector: 'app-opinion-card',
  templateUrl: './opinion-card.component.html',
  styleUrls: ['./opinion-card.component.scss'],
})
export class OpinionCardComponent implements AfterViewInit {

  @Input() thought!: TextThought;
  @Input() user!: User;
  date: string = "";
  constructor(private router: Router, public storageService: StorageService, public likeService: LikeService) { }

  ngAfterViewInit() {

    this.date = formatRemainingDate(this.thought!.share_date);

  }

  debug() {

console.log("DEBUG");

  }

  public openProfile() {

    this.router.navigate(["/tabs/profile", { id: this.thought!.owner_id }]);

  }

}
