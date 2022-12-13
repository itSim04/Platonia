import { StorageService } from './../../../linking/apis/storage.service';
import { Component, OnInit } from '@angular/core';
import { Database, get, getDatabase, onValue, ref, set, DatabaseReference } from '@angular/fire/database';
import { User } from 'src/app/linking/models/user-main';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {

  db: Database = getDatabase();
  session_user!: User;
  constructor(private database: Database, private storageService: StorageService) {


  }

  ngOnInit() {
    this.storageService.getSessionUser().then(r => {
      this.session_user = r

      set(ref(this.db, 'users/' + r.user_id), {

        name: r.username

      });

      const starCountRef: DatabaseReference = ref(this.db, 'users/1/name');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      });


    });

  }

}
