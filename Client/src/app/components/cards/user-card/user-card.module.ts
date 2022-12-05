import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { UserCardComponent } from './user-card.component';

@NgModule({
    declarations: [
        UserCardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        UserCardComponent,
    ]
})
export class UserCardModule { }