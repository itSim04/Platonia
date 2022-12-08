import { Component, Input, OnInit } from '@angular/core';
import { InterestService } from 'src/app/linking/apis/interest.service';
import { StorageService } from 'src/app/linking/apis/storage.service';
import { ExitCodes } from 'src/app/helper/constants/db_schemas';
import { Interest } from 'src/app/linking/models/interest-main';
import { User } from 'src/app/linking/models/user-main';

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

    this.storageService.getSessionUser().then(o => {

      if (this.interest?.is_followed) {

        this.interest.is_followed = false;
        this.interestService.unenrollUser({ interest_id: this.interest.interest_id, user_id: o.user_id }).subscribe(r => {

          if (r.status != ExitCodes.INTERESTS_UNENROLL_USER) {

            this.interest!.is_followed = true;

          }

        });

      } else {

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
