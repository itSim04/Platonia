import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FOLLOWS, USERS } from '../helper/constants/db_columns';
import { RESPONSE_MODEL } from '../models/response-model';
import { Packager } from '../helper/packager';
import { APIS, FOLLOW_SCHEMA } from '../helper/constants/db_schemas';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  api: string = "follow";
  constructor(private http: HttpClient) { }


  public follow(user_id1: number, user_id2: number): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(FOLLOW_SCHEMA.FOLLOW, this.api, `&${FOLLOWS.USER_ID1}=${user_id1}&${FOLLOWS.USER_ID2}=${user_id2}&${FOLLOWS.FOLLOW_DATE}=${new Date().toISOString().slice(0, 19).replace('T', ' ')}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public unfollow(user_id1: number, user_id2: number): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(FOLLOW_SCHEMA.UNFOLLOW, this.api, `&${FOLLOWS.USER_ID1}=${user_id1}&${FOLLOWS.USER_ID2}=${user_id2}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getFollowers(user_id: number): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(FOLLOW_SCHEMA.GET_FOLLOWERS, this.api, `&${USERS.ID}=${user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getFollowings(user_id: number): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(FOLLOW_SCHEMA.GET_FOLLOWINGS, this.api, `&${USERS.ID}=${user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public isFollowing(user_id1: number, user_id2: number): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(FOLLOW_SCHEMA.IS_FOLLOWING, this.api, `&${FOLLOWS.USER_ID1}=${user_id1}&${FOLLOWS.USER_ID2}=${user_id2}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

}
