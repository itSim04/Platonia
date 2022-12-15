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

  // Holds an opinion that the user can like and delete

  @Input() thought!: TextThought; // The opinion this class holds
  @Input() user!: User; // The user who owns the opinion
  @Output() delete: EventEmitter<number> = new EventEmitter(); // Emitted when the opinion is deleted

  constructor(private router: Router, public storageService: StorageService, public likeService: LikeService) { }

  
  deleteOpinion() {

    // Deletes the opinion
    
    this.delete.emit(this.thought.thought_id);

  }
  
  public openProfile() {
    
    // Opens the profile of the owner

    this.router.navigate(["/tabs/profile", { id: this.thought!.owner_id }]);
    
  }

  get date() {

    // Returns the date in a readable format
    
    return formatRemainingDate(this.thought.share_date);

  }

}
