import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../apis/user.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  trigger() {

    this.userService.update_user({ user_id: 84, username: "Test", bio: "", email: "test123445", birthday: new Date(), gender: 0, join: new Date(), followers: 0, followings: 0 }).subscribe(response => console.log(response));
    this.userService.check("itSim04", "fgdgd").subscribe(r => console.log(r));
    this.userService.authenticate("itSim04", "Test1234").subscribe(r => console.log(r));
  }


}
