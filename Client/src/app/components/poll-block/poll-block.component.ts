import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-poll-block',
  templateUrl: './poll-block.component.html',
  styleUrls: ['./poll-block.component.scss'],
})
export class PollBlockComponent implements OnInit {

  @Input() progress: number = 0;
  @Input() subject: string = "";
  @Input() is_max: boolean = false;
  @Output() subjectEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  emit(e: any) {

    this.subjectEvent.emit(e.detail.value);
    console.log(e);

  }

}
