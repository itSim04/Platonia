import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIS, RESPONSE, USERS, USERS_SCHEMA, USERS_TEMP } from '../constants';
import { USER, USER_RESPONSE } from '../models/users-model';
import { RESPONSE_MODEL } from '../models/response-model';
import { Form } from '@angular/forms';
import { Packager } from '../packager';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api: string = "users";
  constructor(private http: HttpClient) { }

  public add_user(user: USER_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.post<any>(APIS.build_url(USERS_SCHEMA.ADD, this.api), Packager.packForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public get_all(): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(USERS_SCHEMA.GET_ALL, this.api)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public get_one(user: USER_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(USERS_SCHEMA.GET_ONE, this.api, `& ${USERS.ID}=${user.user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }




  public update_user(user: USER_RESPONSE) {

    return this.http.post<any>(APIS.build_url(USERS_SCHEMA.UPDATE, this.api), Packager.packUserForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));


  }

  public check(user: USER_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.get<RESPONSE_MODEL>(APIS.build_url(USERS_SCHEMA.CHECK, this.api, `&${USERS.USERNAME}=${user.username}&${USERS.EMAIL}=${user.email}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));


  }

  public authenticate(user: USER_RESPONSE) {

    const form: FormData = new FormData();
    form.append(USERS.USERNAME, user.username!);
    form.append(USERS.PASSWORD, user.password!);

    return this.http.post<any>(APIS.build_url(USERS_SCHEMA.AUTHENTICATE, this.api), Packager.packUserForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }


}
