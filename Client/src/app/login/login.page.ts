import { Component, OnInit } from '@angular/core';
import { StorageService } from '../apis/storage.service';
import { UserService } from '../apis/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";
  constructor(private userService: UserService, private storageService: StorageService) { }

  ngOnInit() {

  }

  onLogin() {

    this.userService.authenticate({ username: this.username, password: this.password }).subscribe(response => {

      this.storageService.set("loggedInUser", response.user);

    })

  }

}
