import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { StorageService } from "src/app/linking/apis/storage.service";
import { User } from "src/app/linking/models/user-main";

@Component({
  selector: 'app-edit-card-thought',
  templateUrl: './edit-thought-card.component.html',
  styleUrls: ['./edit-thought-card.component.scss'],
})
export class EditThoughtCardComponent {

  // Holds a Thought that the user can edit

  session_user?: User; // The user currently logged in

  @Input() type?: number; // The type of the thought

  content?: string; // The content of the thought
  media?: string; // The media of the thought (if applicable)
  @Output() contentEmitter: EventEmitter<string> = new EventEmitter(); // Emitted when the content is edited
  @Output() poll1Emitter: EventEmitter<string> = new EventEmitter(); // Emitted when the first poll is edited
  @Output() poll2Emitter: EventEmitter<string> = new EventEmitter(); // Emitted when the second poll is edited
  @Output() poll3Emitter: EventEmitter<string> = new EventEmitter(); // Emitted when the third poll is edited
  @Output() poll4Emitter: EventEmitter<string> = new EventEmitter(); // Emitted when the fourth poll is edited
  @Output() mediaEmitter: EventEmitter<string> = new EventEmitter(); // Emitted when the media is uploaded

  constructor(public storageService: StorageService) {}

  ionViewWillEnter() {

    // Retrieves the logged in user
    this.ngOnInit();

  }

  ngOnInit() {

    // Retrieves the logged in user
    this.storageService.getSessionUser().then(r => this.session_user = r);

  }
  addImage() {

    // Uploads an image
    Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,

    }).then(image => {

      this.media = image.base64String;
      this.mediaEmitter.emit(image.base64String);

    });

  }

}
