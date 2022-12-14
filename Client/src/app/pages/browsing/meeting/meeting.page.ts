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

  session_user!: User;
  users: Array<User> = new Array();
  constructor(private database: Database, private storageService: StorageService, private router: Router, private userService: UserService, private interestService: InterestService) { }

  ngOnInit() {

    this.storageService.getSessionUser().then(user => {

      this.session_user = user;

      this.interestService.getInterestsOfUser({ user_id: user.user_id }).subscribe(r => {

        const interests = r.interests;

        this.userService.getAll().subscribe(r => {

          //this.users = Array.from(r.users?.values()!);

          Array.from(r.users?.values()!).forEach(u => {

            if (u.user_id != user.user_id) {
              this.users.push(u);


              u.credit = 0;
              if (u.gender == user.gender) u.credit++;
              if (u.birthday.getFullYear() > user.birthday.getFullYear() - 1 && u.birthday.getFullYear() < user.birthday.getFullYear() + 1) u.credit += 2;
              u.interests!.forEach(element => {

                if (interests?.has(element.interest_id)) u.credit! += 3;

              });


            }

          });

          console.log("Users", this.users.sort((a: User, b: User) => b.credit! - a.credit!));
        });

      });

    });




  }

  get gender() {

    return Genders[this.users[0].gender];

  }

  reject() {

    this.users.splice(0, 1);

  }

  meet(user: User) {

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
