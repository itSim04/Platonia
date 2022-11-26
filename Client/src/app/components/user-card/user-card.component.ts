import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users-model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {

  @Input() public user?: User;
  constructor(private router: Router) {

  }

  ngAfterViewInit() {

    console.log(this.user);

  }

  public openProfile() {

    this.router.navigate(["/profile", { id: this.user!.user_id }]);


  }


}
