import { NgModule } from '@angular/core';
import { ChatCardComponent } from './chat-card.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        ChatCardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        ChatCardComponent,
    ]
})
export class ChatCardModule { }