import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { map, Observable } from 'rxjs';
import { APIS, RESPONSE, USERS, USERS_SCHEMA, USERS_TEMP } from '../constants';
import { USER } from '../models/users-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api: string = "users";
  constructor(private http: HttpClient) { }

  private pack(user: any): USER {

    const current: USER = {

      user_id: user[USERS.ID],
      username: user[USERS.USERNAME],
      bio: user[USERS.BIO],
      birthday: user[USERS.BIRTHDAY],
      email: user[USERS.EMAIL],
      followers: user[USERS_TEMP.FOLLOWERS],
      followings: user[USERS_TEMP.FOLLOWINGS],
      gender: user[USERS.GENDER],
      join: user[USERS.JOIN],
      banner: user[USERS.BANNER],
      picture: user[USERS.PICTURE]

    };

    return current;
  }

  private unpack(user: USER): FormData {

    const form = new FormData();
    form.append(USERS.ID, user.user_id + "");
    form.append(USERS.USERNAME, user.username);
    form.append(USERS.PASSWORD, "1234");
    form.append(USERS.BIO, user.bio);
    form.append(USERS.BIRTHDAY, user.birthday + "");
    form.append(USERS.EMAIL, user.email);
    form.append(USERS_TEMP.FOLLOWERS, user.followers + "");
    form.append(USERS_TEMP.FOLLOWINGS, user.followings + "");
    form.append(USERS.GENDER, user.gender + "");
    form.append(USERS.JOIN, user.join + "");
    form.append(USERS.BANNER, user.banner + "");
    form.append(USERS.PICTURE, user.picture + "");
    return form;


  }



  public add_user(user: USER) {

    return this.http.post<any>(APIS.build_url(USERS_SCHEMA.ADD, this.api), this.unpack(user)).pipe(map((data: any) => {

      console.log(data);
      if (data[RESPONSE.USER] != undefined && data[RESPONSE.USER][0] != undefined) {

        this.pack(data[RESPONSE.USER][0]);

      } else {


      }

    }));

  }

  public get_all(): Observable<USER> {

    return this.http.get<any>(APIS.build_url(USERS_SCHEMA.GET_ALL, this.api)).pipe(map((data: any) =>

      data[RESPONSE.USERS].map((user: USER) => this.pack(user))

    ));

  }

  public get_one(user_id: number): Observable<USER> {

    return this.http.get<any>(APIS.build_url(USERS_SCHEMA.GET_ONE, this.api, `& ${USERS.ID}=${user_id}`)).pipe(map((data: any) =>

      this.pack(data[RESPONSE.USER][0])

    ));

  }




  public update(user: USER) {

    return this.http.post<any>(APIS.build_url(USERS_SCHEMA.UPDATE, this.api), this.unpack(user)).pipe(map((data: any) => {

      if (data[RESPONSE.USER] != undefined) {
        this.pack(data[RESPONSE.USER][0]);
      } else {
        console.log(data);
      }

    }));


  }

  public check() {


  }

  public authenticate() {



  }


}
