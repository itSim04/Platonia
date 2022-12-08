import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post.page';
import { EditThoughtCardModule } from '../../../components/cards/edit-thought-card/edit-thought-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    EditThoughtCardModule
  ],
  declarations: [PostPage]
})
export class PostPageModule {}
