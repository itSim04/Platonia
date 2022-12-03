import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { InterestCardModule } from '../components/interest-card/interest-card.module';
import { ThoughtCardModule } from '../components/thought/thought-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    InterestCardModule,
    ThoughtCardModule
  ],
  declarations: [ProfilePage, EditProfilePage]
})
export class ProfilePageModule {}
