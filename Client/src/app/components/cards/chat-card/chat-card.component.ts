import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/linking/models/messaging-main';
import { formatDate } from 'src/app/helper/utility';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent {

  // Holds a Chat that the user can enter

  @Input() chat!: Chat; // The chat this Class represents
  constructor(private router: Router) { }

  openChat() {

    // Opens the Chat this class represents

    const user1: number = this.chat.user1.user_id;
    const user2: number = this.chat.user2.user_id;
    this.router.navigate(["chats/", {

      id: Math.min(user1, user2) + "-" + Math.max(user1, user2)

    }]);

  }

  
  formatDate(date: Date): string {
    
    // Formats the date in a readable format
    return formatDate(date);
    
  }
  get lastSender() {

    // Retrieves the last sender
    const id = this.chat.last_message.owner_id;
    if (id == this.chat.user1.user_id) return "You";
    else return this.chat.user2.username;

  }

}
