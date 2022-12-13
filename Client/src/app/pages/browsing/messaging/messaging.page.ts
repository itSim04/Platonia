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

  chats: Array<string> = new Array();

  isNewOpen: boolean = false;


  db: Database = getDatabase();
  session_user!: User;
  constructor(private database: Database, private storageService: StorageService, private userService: UserService) {


  }

  ngOnInit() {

    this.storageService.getSessionUser().then(r => {

      this.session_user = r
      const chatRef = ref(this.db, 'users/' + r.user_id + '/chats/');
      onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        this.chats.splice(0);
        if (data) {
          Object.keys(data).forEach((element: any) => {
            this.chats.push(element);
          });
        }


      });


    });




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

    this.complete_users.splice(0);
    this.users.splice(0);
    this.userService.getAll().subscribe(r => r.users?.forEach(u => {

      if (u.user_id != this.session_user.user_id) {
        //this.complete_users.splice(0);
        this.isNewOpen = state;
        this.complete_users.push(u);
        this.users.push(u);
      }
      
    }));


  }

}
