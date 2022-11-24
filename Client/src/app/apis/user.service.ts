import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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



  public add_user(user: USER) {


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




  public update() {


  }

  public check() {


  }

  public authenticate() {



  }


}
