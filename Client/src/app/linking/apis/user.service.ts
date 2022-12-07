import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserParts, } from '../../helper/constants/db_columns';
import { UserRequest } from '../models/users-request';
import { Response } from '../models/response-model';
import { Packager } from '../../helper/packager';
import { BuildAPIs, UserAPIs } from '../../helper/constants/db_schemas';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api: string = "users";
  constructor(private http: HttpClient) { }

  public addUser(user: UserRequest): Observable<Response> {

    return this.http.post<any>(BuildAPIs.build_url(UserAPIs.ADD, this.api), Packager.packUserForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getAll(): Observable<Response> {

    return this.http.get<any>(BuildAPIs.build_url(UserAPIs.GET_ALL, this.api)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getOne(user: UserRequest): Observable<Response> {

    return this.http.get<any>(BuildAPIs.build_url(UserAPIs.GET_ONE, this.api, `& ${UserParts.ID}=${user.user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }




  public updateUser(user: UserRequest): Observable<Response> {

    return this.http.post<any>(BuildAPIs.build_url(UserAPIs.UPDATE, this.api), Packager.packUserForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));


  }

  public check(user: UserRequest): Observable<Response> {

    return this.http.get<Response>(BuildAPIs.build_url(UserAPIs.CHECK, this.api, `&${UserParts.USERNAME}=${user.username}&${UserParts.EMAIL}=${user.email}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));


  }

  public authenticate(user: UserRequest) {

    const form: FormData = new FormData();
    form.append(UserParts.USERNAME, user.username!);
    form.append(UserParts.PASSWORD, user.password!);

    return this.http.post<any>(BuildAPIs.build_url(UserAPIs.AUTHENTICATE, this.api), Packager.packUserForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public uploadPicture(user: UserRequest) {

    return this.http.post<any>(BuildAPIs.build_url(UserAPIs.UPLOAD_PROFILE, this.api), Packager.packUserForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }


  public uploadBanner(user: UserRequest) {

    return this.http.post<any>(BuildAPIs.build_url(UserAPIs.UPLOAD_BANNER, this.api), Packager.packUserForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }


}
