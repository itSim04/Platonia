import { NgModule } from '@angular/core';
import { EditThoughtCardComponent } from './edit-thought-card.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { UserCardModule } from '../user-card/user-card.module';
import { PollBlockModule } from '../../blocks/poll-block/poll-block.module';

@NgModule({
    declarations: [
        EditThoughtCardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserCardModule,
        PollBlockModule
    ],
    exports: [
        EditThoughtCardComponent,
    ]
})
export class EditThoughtCardModule { }