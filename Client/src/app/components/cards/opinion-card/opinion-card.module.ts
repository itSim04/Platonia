import { NgModule } from '@angular/core';
import { OpinionCardComponent } from './opinion-card.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { UserCardModule } from '../user-card/user-card.module';
import { PollBlockModule } from '../../blocks/poll-block/poll-block.module';

@NgModule({
    declarations: [
        OpinionCardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserCardModule,
        PollBlockModule
    ],
    exports: [
        OpinionCardComponent,
    ]
})
export class OpinionCardModule { }