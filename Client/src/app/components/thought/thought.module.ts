import { NgModule } from '@angular/core';
import { ThoughtComponent } from './thought.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        ThoughtComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    exports: [
        ThoughtComponent,
    ]
})
export class ThoughtModule { }