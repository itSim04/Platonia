import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/linking/models/user-main';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {

  // Holds a User that the user can visit

  @Input() public user!: User; // The user this class represents
  @Input() navigate: boolean = true // Whether the class should allow visits
  constructor(private router: Router) {

  }

  public openProfile() {

    // Opens the user this class represents

    if (this.navigate)
      this.router.navigate(["/tabs/profile", { id: this.user!.user_id }]);

  }


}
