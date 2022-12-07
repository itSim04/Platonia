import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FollowParts, UserParts } from '../../helper/constants/db_columns';
import { Packager } from '../../helper/packager';
import { BuildAPIs, FollowAPIs } from '../../helper/constants/db_schemas';
import { ResponseReceipt } from '../models/request-models';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  api: string = "follow";
  constructor(private http: HttpClient) { }


  public follow(user_id1: number, user_id2: number): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(FollowAPIs.FOLLOW, this.api, `&${FollowParts.USER_ID1}=${user_id1}&${FollowParts.USER_ID2}=${user_id2}&${FollowParts.FOLLOW_DATE}=${new Date().toISOString()}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public unfollow(user_id1: number, user_id2: number): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(FollowAPIs.UNFOLLOW, this.api, `&${FollowParts.USER_ID1}=${user_id1}&${FollowParts.USER_ID2}=${user_id2}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getFollowers(user_id: number): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(FollowAPIs.GET_FOLLOWERS, this.api, `&${UserParts.ID}=${user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getFollowings(user_id: number): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(FollowAPIs.GET_FOLLOWINGS, this.api, `&${UserParts.ID}=${user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public isFollowing(user_id1: number, user_id2: number): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(FollowAPIs.IS_FOLLOWING, this.api, `&${FollowParts.USER_ID1}=${user_id1}&${FollowParts.USER_ID2}=${user_id2}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

}
