import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PollBlockComponent } from './poll-block.component';

@NgModule({
    declarations: [
        PollBlockComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        PollBlockComponent,
    ]
})
export class InterestCardModule { }