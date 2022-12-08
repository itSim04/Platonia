import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { UserCardModule } from '../../../components/cards/user-card/user-card.module';
import { InterestCardModule } from '../../../components/cards/interest-card/interest-card.module';
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    UserCardModule,
    InterestCardModule,
    IonCustomScrollbarModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
