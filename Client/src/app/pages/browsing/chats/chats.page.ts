import { formatDate, formatRemainingDate } from 'src/app/helper/utility';
import { UserService } from './../../../linking/apis/user.service';
import { Message } from './../../../linking/models/messaging-main';
import { User } from './../../../linking/models/user-main';
import { StorageService } from './../../../linking/apis/storage.service';
import { Database, DatabaseReference, getDatabase, onChildAdded, onValue, push, ref, runTransaction, set, update } from '@angular/fire/database';
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

  // Holds a conversation
  loading: boolean = true; // Whether the page is still loading
  message: string = ""; // The current message

  session_user!: User; // The logged in user

  db: Database = getDatabase(); // Instance of firebase
  id?: string; // The id of the chat (x-y)
  chat?: Chat; // The chat this class holds
  constructor(private router: Router, private database: Database, private userService: UserService, private route: ActivatedRoute, private storageService: StorageService) { }

  ngOnInit() {

    // Retrieves the messages from Firebase

    this.db = getDatabase();
    this.id = String(this.route.snapshot.paramMap.get("id"));

    this.storageService.getSessionUser().then(r => {

      this.session_user = r
      this.userService.getOne({ user_id: this.seperateOwner(this.id!) }).subscribe(u => {

        this.chat = new Chat(r, u.user!, new Date(), new Message(new Date(), -1, ""), new Array());
        const commentsRef = ref(this.db, 'messages/' + this.id);
        onChildAdded(commentsRef, (snapshot) => {
          
          this.loading = false;
          const data = snapshot.val()
          this.chat?.messages.push(new Message(new Date(data["timestamp"]), data["sender"], data["message"]));
          console.log(this.chat);

        });

      });

    });
  }

  seperateOwner(id: string): number {
    
    // Analyzes the ID and returns the other user's id

    if (id.split('-')[0] == String(this.session_user.user_id)) {

      return Number.parseInt(id.split('-')[1]);

    }

    if (id.split('-')[1] == String(this.session_user.user_id)) {

      return Number.parseInt(id.split('-')[0]);

    }

    throw new Error("Illegal argument Exception");
  }



  postMessage() {

    // Posts the message

    const postListRef = ref(this.db, 'messages/' + this.id);
    const newPostRef = push(postListRef);
    set(newPostRef, {
      message: this.message,
      sender: this.session_user!.user_id,
      timestamp: new Date().toISOString()
    }).catch(r => console.log(r));

    const chatRef = ref(this.db, 'chats/' + this.id);

    update(chatRef, {
      lastMessage: this.message,
      lastDate: new Date().toISOString(),
      lastSender: this.session_user.user_id
    }).catch(r => console.log(r));

    const postRef: DatabaseReference = ref(this.db, "users/" + this.seperateOwner(this.id!) + "/chats/");

    runTransaction(postRef, (post) => {

      if (!post) {

        post = {

          [this.id!]: new Date().toISOString()

        }

      } else if (!post[this.id!]) {

        post[this.id!] = new Date().toISOString()

      }
      return post;
    }).catch(r => console.log(r));

    this.message = "";

  }

  formatDate(date: Date): string {

    // Formats the date in a readable format

    return formatDate(date);

  }

  goBack() {

    // Goes back to the Chat selection screen

    this.router.navigate(["tabs/messaging"]);

  }

  // Defines border logic for messages
  topLeft(c: Message, i: number) {

    if (i == 0 || this.formatDate(this.chat?.messages![i - 1].date!) != this.formatDate(c.date) || c.owner_id == this.session_user.user_id) {

      return '20px';

    } else if (i > 0 && this.chat?.messages![i - 1].owner_id == c.owner_id) {

      return '5px';

    } else {

      return '20px';

    }

  }

  bottomRight(c: Message, i: number) {

    if (i == this.chat?.messages!.length! - 1 || this.formatDate(this.chat?.messages![i + 1].date!) != this.formatDate(c.date) || c.owner_id != this.session_user.user_id) {

      return '20px';

    } else if (i < this.chat?.messages!.length! - 1 && this.chat?.messages![i + 1].owner_id == c.owner_id) {

      return '5px'

    } else {

      return '20px';

    }
  }

  bottomLeft(c: Message, i: number) {

    if (i == this.chat?.messages!.length! - 1 || this.formatDate(this.chat?.messages![i + 1].date!) != this.formatDate(c.date) || c.owner_id == this.session_user.user_id) {

      return '20px';

    } else if (i < this.chat?.messages!.length! - 1 && this.chat?.messages![i + 1].owner_id == c.owner_id) {

      return '5px'

    } else {

      return '20px';

    }
  }

  topRight(c: Message, i: number) {

    if (i == 0 || this.formatDate(this.chat?.messages![i - 1].date!) != this.formatDate(c.date) || c.owner_id != this.session_user.user_id) {

      return '20px';

    } else if (i > 0 && this.chat?.messages![i - 1].owner_id == c.owner_id) {

      return '5px'

    } else {

      return '20px';

    }
  }





}

