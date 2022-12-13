import { UserService } from './../../../linking/apis/user.service';
import { StorageService } from './../../../linking/apis/storage.service';
import { Component, OnInit } from '@angular/core';
import { Database, get, getDatabase, onValue, ref, set, DatabaseReference, child, update } from '@angular/fire/database';
import { User } from 'src/app/linking/models/user-main';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {

  complete_users: Array<User> = new Array();
  users: Array<User> = new Array();

  isNewOpen: boolean = false;


  db: Database = getDatabase();
  session_user!: User;
  constructor(private database: Database, private storageService: StorageService, private userService: UserService) {


  }

  ngOnInit() {
    this.storageService.getSessionUser().then(r => {


      this.session_user = r


    });

    this.userService.getAll().subscribe(r => r.users?.forEach(u => {

      //this.complete_users.splice(0);
      this.complete_users.push(u);
      this.users.push(u);

    }));



  }

  handleChange(event: any) {

    const query = event.target.value.toLowerCase();
    this.users = this.complete_users.filter(r => r.username.toLowerCase().indexOf(query) > -1);

  }

  addChat(user: User) {
    
    update(ref(this.db, "users/" + this.session_user.user_id + "/chats/"), {

      [Math.min(this.session_user.user_id, user.user_id) + "-" + Math.max(this.session_user.user_id, user.user_id)]: true

      });
  }

  toggleNew(state: boolean) {

    this.isNewOpen = state;

  }

}
