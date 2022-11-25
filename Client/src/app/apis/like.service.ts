import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { APIS, FOLLOWS, LIKES, LIKES_SCHEMA } from '../constants';
import { RESPONSE_MODEL } from '../models/response-model';
import { Packager } from '../packager';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  api: string = "likes";
  constructor(private http: HttpClient) { }

  public like(user_id: number, thought_id: number): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(LIKES_SCHEMA.LIKE, this.api, `&${LIKES.USER_ID}=${user_id}&${LIKES.THOUGHT_ID}=${thought_id}&${LIKES.LIKE_DATE}=${new Date().toISOString().slice(0, 19).replace('T', ' ')}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public unlike(user_id: number, thought_id: number): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(LIKES_SCHEMA.UNLIKE, this.api, `&${LIKES.USER_ID}=${user_id}&${LIKES.THOUGHT_ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

}
