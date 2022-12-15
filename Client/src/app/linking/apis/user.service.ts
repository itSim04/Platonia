import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { UserParts } from "src/app/helper/constants/db_columns";
import { BuildAPIs, UserAPIs } from "src/app/helper/constants/db_schemas";
import { Packager } from "src/app/helper/packager";
import { ResponseReceipt, UserRequest } from "../models/request-models";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api: string = "users";
  constructor(private http: HttpClient) { }

  // Adds a user (takes a username, password, birthday and gender)
  public addUser(user: UserRequest): Observable<ResponseReceipt> {

    return this.http.post<any>(BuildAPIs.build_url(UserAPIs.ADD, this.api), Packager.packUserForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Gets all users
  public getAll(): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(UserAPIs.GET_ALL, this.api)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Gets one user (takes a user id)
  public getOne(user: UserRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(UserAPIs.GET_ONE, this.api, `& ${UserParts.ID}=${user.user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Gets a user from their email (takes an email)
  public getFromEmail(user: UserRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(UserAPIs.GET_FROM_EMAIL, this.api, `& ${UserParts.EMAIL}=${user.email}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Updates a user (takes a user id and any combination of user properties)
  public updateUser(user: UserRequest): Observable<ResponseReceipt> {

    return this.http.post<any>(BuildAPIs.build_url(UserAPIs.UPDATE, this.api), Packager.packUserForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));


  }

  // chekcs a name and an email (takes a name and an email)
  public check(user: UserRequest): Observable<ResponseReceipt> {

    return this.http.get<ResponseReceipt>(BuildAPIs.build_url(UserAPIs.CHECK, this.api, `&${UserParts.USERNAME}=${user.username}&${UserParts.EMAIL}=${user.email}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));


  }

  // Authenticates a user (takes a username and a password)
  public authenticate(user: UserRequest): Observable<ResponseReceipt> {

    return this.http.post<any>(BuildAPIs.build_url(UserAPIs.AUTHENTICATE, this.api), Packager.packUserForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Uploads a profile picture (takes a user id and a picture)
  public uploadPicture(user: UserRequest): Observable<ResponseReceipt> {

    return this.http.post<any>(BuildAPIs.build_url(UserAPIs.UPLOAD_PROFILE, this.api), Packager.packUserForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Uploads a banner picture (takes a user id and a picture)
  public uploadBanner(user: UserRequest): Observable<ResponseReceipt> {

    return this.http.post<any>(BuildAPIs.build_url(UserAPIs.UPLOAD_BANNER, this.api), Packager.packUserForPOST(user)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }


}
