import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FOLLOWS, LIKES, THOUGHTS, USERS } from '../../helper/constants/db_columns';
import { RESPONSE } from '../models/response-model';
import { Packager } from '../../helper/packager';
import { APIS, LIKES_SCHEMA } from '../../helper/constants/db_schemas';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  api: string = "likes";
  constructor(private http: HttpClient) { }

  public like(user_id: number, thought_id: number): Observable<RESPONSE> {

    return this.http.get<any>(APIS.build_url(LIKES_SCHEMA.LIKE, this.api, `&${LIKES.USER_ID}=${user_id}&${LIKES.THOUGHT_ID}=${thought_id}&${LIKES.LIKE_DATE}=${new Date().toISOString()}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public unlike(user_id: number, thought_id: number): Observable<RESPONSE> {

    return this.http.get<any>(APIS.build_url(LIKES_SCHEMA.UNLIKE, this.api, `&${LIKES.USER_ID}=${user_id}&${LIKES.THOUGHT_ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }
  
  public getLikesByUser(user_id: number): Observable<RESPONSE> {
    
    return this.http.get<any>(APIS.build_url(LIKES_SCHEMA.GET_LIKES_BY_USER, this.api, `&${LIKES.USER_ID}=${user_id}`)).pipe(map((data: any) =>
    
    Packager.responseUnpack(data)
    
    ));
    
  }

  public getLikesOnThought(thought_id: number): Observable<RESPONSE> {

    return this.http.get<any>(APIS.build_url(LIKES_SCHEMA.GET_LIKES_ON_THOUGHT, this.api, `&${LIKES.THOUGHT_ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

}
