import { Component, Input } from '@angular/core';
import { InterestService } from 'src/app/linking/apis/interest.service';
import { StorageService } from 'src/app/linking/apis/storage.service';
import { ExitCodes } from 'src/app/helper/constants/db_schemas';
import { Interest } from 'src/app/linking/models/interest-main';

@Component({
  selector: 'app-interest-card',
  templateUrl: './interest-card.component.html',
  styleUrls: ['./interest-card.component.scss'],
})
export class InterestCardComponent {

  // Holds an interest that the user can enroll in

  @Input() interest?: Interest; // The interest this card holds
  constructor(private interestService: InterestService, private storageService: StorageService) { }

  toggleInterest() {

    // Enroll/Unenroll the user in the thought this class holds
    this.storageService.getSessionUser().then(o => {

      if (this.interest?.is_followed) {

        // If the user is already enrolled
        
        this.interest.is_followed = false;
        this.interestService.unenrollUser({ interest_id: this.interest.interest_id, user_id: o.user_id }).subscribe(r => {

          if (r.status != ExitCodes.INTERESTS_UNENROLL_USER) {

            this.interest!.is_followed = true;

          }

        });

      } else {

        // If the user is not enrolled

        this.interest!.is_followed = true;
        this.interestService.enrollUser({ interest_id: this.interest!.interest_id, user_id: o.user_id }).subscribe(r => {

          if (r.status != ExitCodes.INTERESTS_ENROLL_USER) {

            this.interest!.is_followed = false;

          }
        });

      }


    })


  }
}
