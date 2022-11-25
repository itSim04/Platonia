import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThoughtService } from '../apis/thought.service';
import { UserService } from '../apis/user.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private thoughtService: ThoughtService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  trigger() {

    // this.userService.update_user({ user_id: 64, username: "Test", bio: "Hello", email: "TEST@gm.com", birthday: new Date(), gender: 0 }).subscribe(response => console.log(response));
    // this.userService.check({ username: "Test", email: "TEST@gm.com" }).subscribe(r => console.log(r));
    // this.userService.authenticate({ username: "itSim04", password: "Test1234" }).subscribe(r => console.log(r));

    this.thoughtService.addThought({ content: "Hi", type: 0, owner_id: 10 }).subscribe(r => console.log(r));
  }

}
