import { NgModule } from '@angular/core';
import { ThoughtComponent } from './thought.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { UserCardModule } from '../user-card/user-card.module';

@NgModule({
    declarations: [
        ThoughtComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserCardModule
    ],
    exports: [
        ThoughtComponent,
    ]
})
export class ThoughtModule { }