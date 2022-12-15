import { Route, Router } from '@angular/router';
import { Chat, Message } from './../../../linking/models/messaging-main';
import { UserService } from './../../../linking/apis/user.service';
import { StorageService } from './../../../linking/apis/storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Database, get, getDatabase, onValue, ref, set, DatabaseReference, child, update, runTransaction } from '@angular/fire/database';
import { User } from 'src/app/linking/models/user-main';
import { OverlayEventDetail } from '@ionic/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal; // The new chat moda;
  id: string = ""; // The id of the new chat (x-y)
  init: boolean = false; // Whether the page initialized

  loading: boolean = true; // Whether the page should be loading
  complete_users: Array<User> = new Array(); // The complete list of users
  users: Array<User> = new Array(); // The filtered list of users
  chats: Array<Chat> = new Array(); // The chats

  db: Database = getDatabase(); // Instance of firebase
  session_user!: User; // The logged in user

  constructor (private database: Database, private router: Router, private storageService: StorageService, private userService: UserService) { }

  ionViewWillEnter() {

    // Downloads chats from firebase and populates the display

    if (!this.init) {
      this.loading = true;
      this.storageService.getSessionUser().then(r => {
        if (r.user_id != this.session_user.user_id) {
          this.ngOnInit();
        } else {
          this.loading = false;
        }
      });
    }
  }

  ngOnDestroy() {

    // Used for transitioning

    this.session_user.user_id = -1;

  }

  ngOnInit() {

    // retrieves data from firebase

    this.loading = true;
    this.init = true;
    this.complete_users.splice(0);
    this.users.splice(0);
    this.storageService.getSessionUser().then(r => {

      this.session_user = r
      this.userService.getAll().subscribe(r => {
        r.users?.forEach(u => {

          if (u.user_id != this.session_user.user_id) {
            //this.complete_users.splice(0);

            this.complete_users.push(u);
            this.users.push(u);
          }
        });
        console.log(this.users);
      });


      const userRef = ref(this.db, 'users/' + r.user_id + '/chats/');
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        this.chats.splice(0);
        if (data) {

          Object.keys(data).forEach((element: any) => {

            const chatRef = ref(this.db, 'chats/' + element);
            onValue(chatRef, (snapshot) => {

              const data = snapshot.val();
              console.log("Value changes", data);
              if (data) {

                let flag: boolean = false;
                this.chats.forEach(r => {

                  if (Math.min(r.user1.user_id, r.user2.user_id) + "-" + Math.max(r.user1.user_id, r.user2.user_id) == data["title"]) {

                    r.last_message = new Message(new Date(data["lastDate"]), data["lastSender"], data["lastMessage"]);
                    flag = true;

                  }
                });

                if (!flag) {
                  this.userService.getOne({ user_id: this.seperateOwner(data["title"]) }).subscribe(r => {

                    this.loading = false;
                    this.init = false;
                    this.chats.push(new Chat(this.session_user, r.user!, data["start"], new Message(new Date(data["lastDate"]), data["lastSender"], data["lastMessage"]), new Array()));
                    this.chats = this.chats.sort((a: Chat, b: Chat) => (b.last_message.date.getTime() - a.last_message.date.getTime()));

                  });
                }

              }
            });

          });

        } else {

          this.loading = false;

        }
      });
    });
  }

  seperateOwner(id: string): number {

    // Seperates the non-owner using the id

    if (id.split('-')[0] == String(this.session_user.user_id)) {

      return Number.parseInt(id.split('-')[1]);

    }

    if (id.split('-')[1] == String(this.session_user.user_id)) {

      return Number.parseInt(id.split('-')[0]);

    }

    throw new Error("Illegal argument Exception");
  }

  handleChange(event: any) {

    // Filters the users

    const query = event.target.value.toLowerCase();
    this.users = this.complete_users.filter(r => r.username.toLowerCase().indexOf(query) > -1);

  }

  cancel() {

    // Dismisses the new chat screen

    this.modal.dismiss(null, 'cancel');

  }

  toggleModal() {

    // Presents the new chat screen

    this.modal.present();

  }

  onWillDismiss(event: Event) {

    // Instantiate a new chat

    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    console.log(ev.detail.role);
    if (ev.detail.role === 'open') {
      this.router.navigate(["chats/", {

        id: this.id

      }]);
    }
  }

  addChat(user: User) {

    // Uploads a new chat on firebase

    if (user.user_id != this.session_user.user_id) {

      this.id = Math.min(this.session_user.user_id, user.user_id) + "-" + Math.max(this.session_user.user_id, user.user_id);
      const db: Database = getDatabase();
      const postRef: DatabaseReference = ref(db, "users/" + this.session_user.user_id + "/chats/");

      runTransaction(postRef, (post) => {

        if (!post) {

          post = {

            [this.id]: new Date().toISOString()

          }

        } else if (!post[this.id]) {

          post[this.id] = new Date().toISOString()

        }
        return post;
      });

      const chatRef: DatabaseReference = ref(db, "chats/" + this.id);

      runTransaction(chatRef, (post) => {

        if (!post) {

          post = {

            title: this.id,
            start: new Date().toISOString(),
            lastDate: new Date().toISOString()


          }

        }

        this.modal.dismiss(null, 'open');

        return post;

      });

    }

  }

}
