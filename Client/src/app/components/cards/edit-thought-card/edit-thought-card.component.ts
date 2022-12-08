import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { StorageService } from "src/app/linking/apis/storage.service";
import { User } from "src/app/linking/models/user-main";

@Component({
  selector: 'app-edit-card-thought',
  templateUrl: './edit-thought-card.component.html',
  styleUrls: ['./edit-thought-card.component.scss'],
})
export class EditThoughtCardComponent implements OnInit {

  session_user?: User;

  @Input() type?: number;

  content?: string;
  @Output() contentEmitter: EventEmitter<string> = new EventEmitter();
  @Output() poll1Emitter: EventEmitter<string> = new EventEmitter();
  @Output() poll2Emitter: EventEmitter<string> = new EventEmitter();
  @Output() poll3Emitter: EventEmitter<string> = new EventEmitter();
  @Output() poll4Emitter: EventEmitter<string> = new EventEmitter();

  constructor(public storageService: StorageService) {

  }

  ionViewWillEnter() {

    this.storageService.getSessionUser().then(r => this.session_user = r);

  }

  ngOnInit() {

    this.storageService.getSessionUser().then(r => this.session_user = r);

  }
}
