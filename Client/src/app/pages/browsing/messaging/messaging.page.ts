import { Route, Router } from '@angular/router';
import { Chat } from './../../../linking/models/messaging-main';
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

  @ViewChild(IonModal) modal!: IonModal;

  id: string = "";

  loading: boolean = true;
  complete_users: Array<User> = new Array();
  users: Array<User> = new Array();

  chats: Set<Chat> = new Set();

  //isNewOpen: boolean = false;


  db: Database = getDatabase();
  session_user!: User;

  constructor(private database: Database, private router: Router, private storageService: StorageService, private userService: UserService) {


  }

  ionViewWillEnter() {

    this.loading = true;
    this.storageService.getSessionUser().then(r => {
      if (r.user_id != this.session_user.user_id) {
        this.ngOnInit();
      } else {
        this.loading = false;
      }
    });

  }

  ngOnInit() {

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
        this.chats.clear();
        if (data) {

          Object.keys(data).forEach((element: any) => {

            const chatRef = ref(this.db, 'chats/' + element);
            onValue(chatRef, (snapshot) => {
              const data = snapshot.val();
              if (data) {

                let flag: boolean = false;
                this.chats.forEach(r => {

                  if (Math.min(r.user1.user_id, r.user2.user_id) + "-" + Math.max(r.user1.user_id, r.user2.user_id) == data["title"]) {
                    flag = true;
                  }
                });

                if (!flag) {
                  this.userService.getOne({ user_id: this.seperateOwner(data["title"]) }).subscribe(r => {

                    this.loading = false;
                    this.chats.add(new Chat(this.session_user, r.user!, data["start"], new Array()));

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

  cancel() {

    this.modal.dismiss(null, 'cancel');

  }

  toggleModal() {

    this.modal.present();

  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    console.log(ev.detail.role);
    if (ev.detail.role === 'open') {
      this.router.navigate(["chats/", {

        id: this.id

      }]);
    }
  }

  addChat(user: User) {

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
            start: new Date().toISOString()


          }

        }

        this.modal.dismiss(null, 'open');

        return post;

      });

    }

  }

  openChat(user1: number, user2: number) {

    this.router.navigate(["chats/", {

      id: Math.min(user1, user2) + "-" + Math.max(user1, user2)

    }]);

  }

}
