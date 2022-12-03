import { Component, Input, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { InterestService } from 'src/app/apis/interest.service';
import { StorageService } from 'src/app/apis/storage.service';
import { EXIT_CODES } from 'src/app/helper/constants/db_schemas';
import { Interest } from 'src/app/models/interests-model';
import { User } from 'src/app/models/users-model';

@Component({
  selector: 'app-interest-card',
  templateUrl: './interest-card.component.html',
  styleUrls: ['./interest-card.component.scss'],
})
export class InterestCardComponent implements OnInit {

  @Input() interest?: Interest;
  constructor(private interestService: InterestService, private storageService: StorageService) { }

  ngOnInit() { }

  toggleInterest() {

    this.storageService.get<User>("loggedInUser").then(o => {

      if (this.interest?.is_followed) {

        this.interest.is_followed = false;
        this.interestService.unenrollUser({ interest_id: this.interest.interest_id, user_id: o.user_id }).subscribe(r => {

          if (r.status != EXIT_CODES.INTERESTS_UNENROLL_USER) {

            this.interest!.is_followed = true;

          }

        });

      } else {

        this.interest!.is_followed = true;
        this.interestService.enrollUser({ interest_id: this.interest!.interest_id, user_id: o.user_id }).subscribe(r => {

          if (r.status != EXIT_CODES.INTERESTS_ENROLL_USER) {

            this.interest!.is_followed = false;

          }
        });

      }


    })


  }
}
