import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/linking/models/user-main';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {

  @Input() public user!: User;
  @Input() navigate: boolean = true
  constructor(private router: Router) {

  }

  public openProfile() {

    if (this.navigate)
      this.router.navigate(["/tabs/profile", { id: this.user!.user_id }]);

  }


}
