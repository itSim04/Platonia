import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/apis/storage.service';
import { Thought } from 'src/app/models/thoughts-model';
import { User } from 'src/app/models/users-model';

@Component({
  selector: 'app-thought',
  templateUrl: './thought.component.html',
  styleUrls: ['./thought.component.scss'],
})
export class ThoughtComponent {

  session_user?: User;
  @Input() user?: User;
  @Input() thought!: Thought;
  @Input() editable?: boolean;
  constructor(private storageService: StorageService) {
  }

  click() {
    console.log(this.user?.username, this.user);
  }

}
