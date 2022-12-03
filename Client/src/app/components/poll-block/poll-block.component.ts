import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-poll-block',
  templateUrl: './poll-block.component.html',
  styleUrls: ['./poll-block.component.scss'],
})
export class PollBlockComponent implements OnInit {

  @Input() progress: number = 0;
  @Input() subject: string = "";
  @Input() is_voted: boolean = false;
  @Input() is_alone: boolean = true;
  @Input() is_max: boolean = false;
  @Input() is_modifiable: boolean = false;
  @Output() subjectEvent = new EventEmitter<string>();
  @Output() incrementer = new EventEmitter<never>();

  constructor() { }

  ngOnInit() { }

  emitSubject(e: any) {

    this.subjectEvent.emit(e.detail.value);

  }

  emitIncrement(e: any) {


  }

  answerPoll() {

    if (!this.is_modifiable) {
      this.incrementer.emit();
    }

  }

}
