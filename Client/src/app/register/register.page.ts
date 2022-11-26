import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_RESPONSE } from '../models/users-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  confirm_password?: string = undefined;
  new_user: USER_RESPONSE = {

    username: undefined,
    email: undefined,
    gender: undefined,
    birthday: new Date(),
    password: undefined

  };
  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goToLogin() {

    this.router.navigate(['/login'])

  }

  public onRegister() {

    console.log(this.new_user.birthday);


  }

}
