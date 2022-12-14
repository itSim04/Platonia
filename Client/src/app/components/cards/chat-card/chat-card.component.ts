import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/linking/models/messaging-main';
import { formatDate } from 'src/app/helper/utility';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit {

  @Input() chat!: Chat;
  constructor(private router: Router) { }

  ngOnInit() { }

  openChat() {

    const user1: number = this.chat.user1.user_id;
    const user2: number = this.chat.user2.user_id;
    this.router.navigate(["chats/", {

      id: Math.min(user1, user2) + "-" + Math.max(user1, user2)

    }]);

  }

  get lastSender() {

    const id = this.chat.last_message.owner_id;
    if (id == this.chat.user1.user_id) return "You";
    else return this.chat.user2.username;

  }

  formatDate(date: Date): string {

    return formatDate(date);

  }

}
