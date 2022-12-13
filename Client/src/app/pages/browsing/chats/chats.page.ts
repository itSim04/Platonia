import { UserService } from './../../../linking/apis/user.service';
import { Message } from './../../../linking/models/messaging-main';
import { User } from './../../../linking/models/user-main';
import { StorageService } from './../../../linking/apis/storage.service';
import { Database, DatabaseReference, getDatabase, onChildAdded, onValue, push, ref, set } from '@angular/fire/database';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/linking/models/messaging-main';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  message: string = "";



  session_user!: User;

  db: Database = getDatabase();
  id?: string;
  chat?: Chat;
  constructor(private database: Database, private userService: UserService, private route: ActivatedRoute, private storageService: StorageService) { }

  ngOnInit() {

    this.db = getDatabase();
    this.id = String(this.route.snapshot.paramMap.get("id"));

    this.storageService.getSessionUser().then(r => {

      this.session_user = r
      this.userService.getOne({ user_id: this.seperateOwner(this.id!) }).subscribe(u => {

        this.chat = new Chat(r, u.user!, new Date(), new Array(new Message(new Date(), 9, "")));
        const commentsRef = ref(this.db, 'messages/' + this.id);
        onChildAdded(commentsRef, (snapshot) => {

          const data = snapshot.val()
          this.chat?.messages.push(new Message(data["timestamp"], data["sender"], data["message"]));
          console.log(this.chat);

        });

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



  ionViewWillEnter() {





  }

  postMessage() {

    const postListRef = ref(this.db, 'messages/' + this.id);
    const newPostRef = push(postListRef);
    set(newPostRef, {
      message: this.message,
      sender: this.session_user!.user_id,
      timestamp: new Date().toISOString()
    });
    this.message = "";

  }

}

