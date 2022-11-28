import { Component, Input, OnInit } from '@angular/core';
import { Thought } from 'src/app/models/thoughts-model';
import { User } from 'src/app/models/users-model';

@Component({
  selector: 'app-thought',
  templateUrl: './thought.component.html',
  styleUrls: ['./thought.component.scss'],
})
export class ThoughtComponent implements OnInit {

  @Input() user?: User;
  @Input() thought!: Thought;
  @Input() editable?: boolean;
  constructor() { }

  ngOnInit() { console.log(this.editable); }

}
