import { Component, OnInit } from '@angular/core';
import { UserService } from '../apis/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";
  constructor(private userService: UserService) { }

  ngOnInit() {



  }

  onLogin() {

    this.userService.authenticate({ username: this.username, password: this.password }).subscribe(response =>

      console.log(response)

    )

  }

}
