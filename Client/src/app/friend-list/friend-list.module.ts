import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendListPageRoutingModule } from './friend-list-routing.module';

import { FriendListPage } from './friend-list.page';
import { UserCardComponent } from '../components/user-card/user-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendListPageRoutingModule
  ],
  entryComponents:[],
  declarations: [FriendListPage, UserCardComponent]
})
export class FriendListPageModule {}
