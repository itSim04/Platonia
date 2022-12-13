import { User } from './../../../linking/models/user-main';
import { StorageService } from './../../../linking/apis/storage.service';
import { Database, DatabaseReference, getDatabase, onValue, push, ref, set } from '@angular/fire/database';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/linking/models/messaging-main';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage {

  message: string = "";

  session_user?: User;

  db: Database = getDatabase();
  id?: string;
  chat?: Chat;
  constructor(private route: ActivatedRoute, private storageService: StorageService) { }

  ionViewWillEnter() {

    this.id = String(this.route.snapshot.paramMap.get("id"));
    this.db = getDatabase();
    this.storageService.getSessionUser().then(r => this.session_user = r);


  }

  postMessage() {

    const postListRef = ref(this.db, 'chats/' + this.id);
    const newPostRef = push(postListRef);
    set(newPostRef, {
      message: this.message,
      sender: this.session_user!.user_id,
      timestamp: new Date().toISOString()
    });
    this.message = "";

  }

}

