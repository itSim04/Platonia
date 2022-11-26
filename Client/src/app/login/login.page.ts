import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from '../apis/storage.service';
import { UserService } from '../apis/user.service';
import { User } from '../models/users-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";
  constructor(public router: Router, private userService: UserService, private storageService: StorageService) { }

  ngOnInit() {

    this.storageService.get("loggedInUser").then(r => {
      if (r != undefined) {
        this.userService.getOne({ user_id: (<User>r).user_id }).subscribe(response => {


          this.storageService.set("loggedInUser", response.user);
          this.router.navigate(["/profile", { id: response.user?.user_id }]);


        })
      }
    });
  }


  onLogin() {

    this.userService.authenticate({ username: this.username, password: this.password }).subscribe(response => {

      this.storageService.set("loggedInUser", response.user);
      this.router.navigate(["/profile", { id: response.user?.user_id }]);

    })

  }

  goToRegister() {

    this.router.navigate(['/register']);

  }

}
