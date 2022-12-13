import { Chat } from './../../../linking/models/messaging-main';
import { UserService } from './../../../linking/apis/user.service';
import { StorageService } from './../../../linking/apis/storage.service';
import { Component, OnInit } from '@angular/core';
import { Database, get, getDatabase, onValue, ref, set, DatabaseReference, child, update, runTransaction } from '@angular/fire/database';
import { User } from 'src/app/linking/models/user-main';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {

  complete_users: Array<User> = new Array();
  users: Array<User> = new Array();

  chats: Array<Chat> = new Array();

  isNewOpen: boolean = false;


  db: Database = getDatabase();
  session_user!: User;
  constructor(private database: Database, private storageService: StorageService, private userService: UserService) {


  }

  ngOnInit() {

    this.complete_users.splice(0);
    this.users.splice(0);
    this.userService.getAll().subscribe(r => r.users?.forEach(u => {

      if (u.user_id != this.session_user.user_id) {
        //this.complete_users.splice(0);

        this.complete_users.push(u);
        this.users.push(u);
      }

    }));

    this.storageService.getSessionUser().then(r => {

      this.session_user = r
      const userRef = ref(this.db, 'users/' + r.user_id + '/chats/');
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        this.chats.splice(0);
        if (data) {

          Object.keys(data).forEach((element: any) => {

            const chatRef = ref(this.db, 'chats/' + element);
            onValue(chatRef, (snapshot) => {
              const data = snapshot.val();
              if (data) {

                this.userService.getOne({ user_id: this.seperateOwner(data["title"]) }).subscribe(r => {

                  this.chats.push(new Chat(this.session_user, r.user!, data["start"], new Array()));

                });

              }
            });

          });

        }
      });
    });
  }

  seperateOwner(id: string): number {

    if (id.split('-')[0] == String(this.session_user.user_id)) {

      return Number.parseInt(id.split('-')[1]);

    }

    if (id.split('-')[1] == String(this.session_user.user_id)) {

      return Number.parseInt(id.split('-')[0]);

    }

    throw new Error("Illegal argument Exception");
  }

  handleChange(event: any) {

    const query = event.target.value.toLowerCase();
    this.users = this.complete_users.filter(r => r.username.toLowerCase().indexOf(query) > -1);

  }

  addChat(user: User) {

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
            start: new Date().toISOString()


          }

        }

        return post;

      });

    }

  }

  toggleNew(state: boolean) {

    this.isNewOpen = state;
  }

}
