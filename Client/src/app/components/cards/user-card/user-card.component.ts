import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/linking/models/users-request';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {

  @Input() public user!: User;
  constructor(private router: Router) {

  }

  public openProfile() {

    this.router.navigate(["/tabs/profile", { id: this.user!.user_id }]);


  }


}
