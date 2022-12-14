import { ToastController } from '@ionic/angular';
import { Component, OnInit } from "@angular/core";
import { InterestService } from "src/app/linking/apis/interest.service";
import { StorageService } from "src/app/linking/apis/storage.service";
import { UserService } from "src/app/linking/apis/user.service";
import { Interest } from "src/app/linking/models/interest-main";
import { User } from "src/app/linking/models/user-main";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  complete_users: Array<User> = new Array(); // Complete list of users 
  users: Array<User> = new Array(); // Filtered list of users

  complete_interests: Array<Interest> = new Array(); // Complete list of interests
  interests: Array<Interest> = new Array(); // Filtered list of interest

  section: string = "default"; // Current section
  constructor(private userService: UserService, private toastController: ToastController, private storageService: StorageService, private interestService: InterestService) { }

  ngOnInit(): void {

    // Retrieves the logged in user
    this.storageService.getSessionUser().then(u => {

      this.userService.getAll().subscribe(r => {

        r.users?.forEach(user => {

          if (u.user_id != user.user_id) {
            this.complete_users.push(user);
            this.users.push(user);
          }

        });

      });



      this.interestService.getAll({ user_id: u.user_id }).subscribe(r => {

        r.interests?.forEach(u => {

          this.complete_interests.push(u);
          this.interests.push(u);

        });
      });
    });

  }

  async request() {

    // Unimplemented
    const toast = await this.toastController.create({
      message: "Unimplemented Feature",
      duration: 1500,
      icon: 'globe'
    });

    await toast.present();

  }


  handleChange(event: any) {

    // Handles querying search

    const query = event.target.value.toLowerCase();

    if (this.section == "default") {

      this.users = this.complete_users.filter(r => r.username.toLowerCase().indexOf(query) > -1);

    } else {

      this.interests = this.complete_interests.filter(r => r.name.toLowerCase().indexOf(query) > -1);

    }
  }

}
