import { NgModule } from '@angular/core';
import { ThoughtCardComponent } from './thought-card.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { UserCardModule } from '../user-card/user-card.module';

@NgModule({
    declarations: [
        ThoughtCardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserCardModule
    ],
    exports: [
        ThoughtCardComponent,
    ]
})
export class ThoughtCardModule { }