import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    IonCustomScrollbarModule
  ],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
