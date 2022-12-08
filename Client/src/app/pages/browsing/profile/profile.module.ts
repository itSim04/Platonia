import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { InterestCardModule } from '../../../components/cards/interest-card/interest-card.module';
import { ThoughtCardModule } from '../../../components/cards/thought-card/thought-card.module';
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    InterestCardModule,
    ThoughtCardModule,
    IonCustomScrollbarModule
  ],
  declarations: [ProfilePage, EditProfilePage]
})
export class ProfilePageModule {}
