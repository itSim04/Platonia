import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-poll-block',
  templateUrl: './poll-block.component.html',
  styleUrls: ['./poll-block.component.scss'],
})
export class PollBlockComponent {

  // Generic poll block

  @Input() progress: number = 0; //The progress of the poll
  @Input() subject: string = ""; // The subject of the poll
  @Input() is_voted: boolean = false; // Whether the current user voted this poll
  @Input() is_alone: boolean = true; // Whether this poll is the only one with votes in its block
  @Input() is_max: boolean = false; // Whether this poll is the highest voted poll
  @Input() is_modifiable: boolean = false; // Whether the user can change the subject
  @Output() subjectEvent = new EventEmitter<string>(); // Emitted when the subject is changed
  @Output() incrementer = new EventEmitter<never>(); // Emitted when the poll is voted

  constructor() { }

  emitSubject(e: any) {

    // Notifies the Parent of the Subject change
    this.subjectEvent.emit(e.detail.value);

  }
  answerPoll() {

    // Notifies the Parent of the Vote 
    if (!this.is_modifiable) {
      this.incrementer.emit();
    }

  }

}
