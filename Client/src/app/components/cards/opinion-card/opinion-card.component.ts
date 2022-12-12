import { AfterViewInit, Output, EventEmitter } from '@angular/core';
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
export class OpinionCardComponent {

  @Input() thought!: TextThought;
  @Input() user!: User;
  @Output() delete: EventEmitter<number> = new EventEmitter();
  constructor(private router: Router, public storageService: StorageService, public likeService: LikeService) { }

  get date() {

    return formatRemainingDate(this.thought.share_date);

  }

  deleteOpinion() {

    this.delete.emit(this.thought.thought_id);

  }

  public openProfile() {

    this.router.navigate(["/tabs/profile", { id: this.thought!.owner_id }]);

  }

}
