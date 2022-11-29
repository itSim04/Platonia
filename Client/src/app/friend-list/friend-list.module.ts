import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendListPageRoutingModule } from './friend-list-routing.module';

import { FriendListPage } from './friend-list.page';
import { UserCardModule } from '../components/user-card/user-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendListPageRoutingModule,
    UserCardModule
  ],
  entryComponents: [],
  declarations: [FriendListPage]
})
export class FriendListPageModule { }
