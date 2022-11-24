import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIS, RESPONSE, USERS, USERS_SCHEMA, USERS_TEMP } from '../constants';
import { USER } from '../models/users-model';
import { RESPONSE_MODEL } from '../models/response-model';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api: string = "users";
  constructor(private http: HttpClient) { }

  private user_pack(data: any): USER {

    const current: USER = {

      user_id: data[USERS.ID],
      username: data[USERS.USERNAME],
      bio: data[USERS.BIO],
      birthday: data[USERS.BIRTHDAY],
      email: data[USERS.EMAIL],
      followers: data[USERS_TEMP.FOLLOWERS],
      followings: data[USERS_TEMP.FOLLOWINGS],
      gender: data[USERS.GENDER],
      join: data[USERS.JOIN],
      banner: data[USERS.BANNER],
      picture: data[USERS.PICTURE]

    };

    return current;
  }

  private response_pack(data: any): RESPONSE_MODEL {

    const response: RESPONSE_MODEL = {

      status: data[RESPONSE.STATUS],
      error_message: data[RESPONSE.ERROR],
      email_available: data[RESPONSE.EMAIL_AVAILABLE],
      username_available: data[RESPONSE.USERNAME_AVAILABLE],
      user: data[RESPONSE.USER] != undefined && data[RESPONSE.USER][0] != undefined ? this.user_pack(data[RESPONSE.USER][0]) : undefined,
      users: data[RESPONSE.USERS]?.map((user: USER) => this.user_pack(user))


    }
    return response;


  }

  private unpack(user: USER, password: string): FormData {

    const form = new FormData();
    form.append(USERS.ID, user.user_id + "");
    form.append(USERS.USERNAME, user.username);
    form.append(USERS.PASSWORD, password);
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



  public add_user(user: USER, password: string): Observable<RESPONSE_MODEL> {

    return this.http.post<any>(APIS.build_url(USERS_SCHEMA.ADD, this.api), this.unpack(user, password)).pipe(map((data: any) =>

      this.response_pack(data)

    ));

  }

  public get_all(): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(USERS_SCHEMA.GET_ALL, this.api)).pipe(map((data: any) =>

      this.response_pack(data)

    ));

  }

  public get_one(user_id: number): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(USERS_SCHEMA.GET_ONE, this.api, `& ${USERS.ID}=${user_id}`)).pipe(map((data: any) =>

      this.response_pack(data)

    ));

  }




  public update_user(user: USER) {

    return this.http.post<any>(APIS.build_url(USERS_SCHEMA.UPDATE, this.api), this.unpack(user, "")).pipe(map((data: any) =>

      this.response_pack(data)

    ));


  }

  public check(username: string, email: string): Observable<RESPONSE_MODEL> {

    return this.http.get<RESPONSE_MODEL>(APIS.build_url(USERS_SCHEMA.CHECK, this.api, `&${USERS.USERNAME}=${username}&${USERS.EMAIL}=${email}`)).pipe(map((data: any) =>

      this.response_pack(data)

    ));


  }

  public authenticate(username: string, password: string) {

    const form: FormData = new FormData();
    form.append(USERS.USERNAME, username);
    form.append(USERS.PASSWORD, password);

    return this.http.post<any>(APIS.build_url(USERS_SCHEMA.AUTHENTICATE, this.api), form).pipe(map((data: any) =>

      this.response_pack(data)

    ));

  }


}
