import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { InterestCardComponent } from './interest-card.component';

@NgModule({
    declarations: [
        InterestCardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        InterestCardComponent,
    ]
})
export class InterestModule { }