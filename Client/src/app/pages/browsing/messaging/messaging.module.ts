import { UserCardModule } from './../../../components/cards/user-card/user-card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagingPageRoutingModule } from './messaging-routing.module';

import { MessagingPage } from './messaging.page';
import { ChatCardModule } from 'src/app/components/cards/chat-card/chat-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagingPageRoutingModule,
    ChatCardModule,
    UserCardModule
  ],
  declarations: [MessagingPage],
  providers: []
})
export class MessagingPageModule { }
