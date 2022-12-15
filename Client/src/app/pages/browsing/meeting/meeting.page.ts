import { Router } from '@angular/router';
import { Genders } from './../../../helper/constants/general';
import { InterestService } from './../../../linking/apis/interest.service';
import { UserService } from './../../../linking/apis/user.service';
import { StorageService } from './../../../linking/apis/storage.service';
import { User } from 'src/app/linking/models/user-main';
import { Component, OnInit } from '@angular/core';
import { Database, getDatabase, DatabaseReference, ref, runTransaction } from '@angular/fire/database';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage implements OnInit {

  // Class that allows user to meet new friends
  session_user!: User; // The logged in user
  users: Array<User> = new Array(); // All users
  constructor (private database: Database, private storageService: StorageService, private router: Router, private userService: UserService, private interestService: InterestService) { }

  ngOnInit() {

    // Algorithm that sorts users based on their gender, age and interests
    this.storageService.getSessionUser().then(user => {

      this.session_user = user;

      this.interestService.getInterestsOfUser({ user_id: user.user_id }).subscribe(r => {

        const interests = r.interests;

        this.userService.getAll().subscribe(r => {

          Array.from(r.users?.values()!).forEach(u => {

            if (u.user_id != user.user_id) {
              this.users.push(u);


              u.credit = 0;
              if (u.gender == user.gender) u.credit++;
              if (u.birthday.getFullYear() > user.birthday.getFullYear() - 1 && u.birthday.getFullYear() < user.birthday.getFullYear() + 1) u.credit += 2;
              u.interests!.forEach((element, key) => {

                if (interests?.has(element.interest_id)) {

                  u.credit! += 3;

                } else {

                  u.interests?.delete(key);

                }

              });


            }

          });

          console.log("Users", this.users.sort((a: User, b: User) => b.credit! - a.credit!));
        });

      });

    });




  }

  goBack() {

    // Goes back to profile

    this.router.navigate(['tabs/profile']);

  }

  get gender() {

    // Links the Gender instance

    return Genders[this.users[0].gender];

  }

  reject() {

    // Rejects a user

    this.users.splice(0, 1);

  }

  meet(user: User) {

    // Starts a chat with a user
    if (user.user_id != this.session_user.user_id) {

      const id: string = Math.min(this.session_user.user_id, user.user_id) + "-" + Math.max(this.session_user.user_id, user.user_id);
      const db: Database = getDatabase();
      const postRef: DatabaseReference = ref(db, "users/" + this.session_user.user_id + "/chats/");

      runTransaction(postRef, (post) => {

        if (!post) {

          post = {

            [id]: new Date().toISOString()

          }

        } else if (!post[id]) {

          post[id] = new Date().toISOString()

        }
        return post;
      });

      const chatRef: DatabaseReference = ref(db, "chats/" + id);

      runTransaction(chatRef, (post) => {

        if (!post) {

          post = {

            title: id,
            start: new Date().toISOString(),
            lastDate: new Date().toISOString()


          }

        }

        this.router.navigate(["chats/", {

          id: id

        }]);

        return post;

      });

    }

  }

}
