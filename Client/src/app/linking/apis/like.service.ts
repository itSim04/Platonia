import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { LikeParts } from "src/app/helper/constants/db_columns";
import { BuildAPIs, LikeAPIs } from "src/app/helper/constants/db_schemas";
import { Packager } from "src/app/helper/packager";
import { ResponseReceipt } from "../models/request-models";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  api: string = "likes";
  constructor(private http: HttpClient) { }

  public like(user_id: number, thought_id: number): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(LikeAPIs.LIKE, this.api, `&${LikeParts.USER_ID}=${user_id}&${LikeParts.THOUGHT_ID}=${thought_id}&${LikeParts.LIKE_DATE}=${new Date().toISOString()}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public unlike(user_id: number, thought_id: number): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(LikeAPIs.UNLIKE, this.api, `&${LikeParts.USER_ID}=${user_id}&${LikeParts.THOUGHT_ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }
  
  public getLikesByUser(user_id: number): Observable<ResponseReceipt> {
    
    return this.http.get<any>(BuildAPIs.build_url(LikeAPIs.GET_LIKES_BY_USER, this.api, `&${LikeParts.USER_ID}=${user_id}`)).pipe(map((data: any) =>
    
    Packager.responseUnpack(data)
    
    ));
    
  }

  public getLikesOnThought(thought_id: number): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(LikeAPIs.GET_LIKES_ON_THOUGHT, this.api, `&${LikeParts.THOUGHT_ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

}
