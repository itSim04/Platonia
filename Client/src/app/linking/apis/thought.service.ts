import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {  ThoughtParts, UserParts } from '../../helper/constants/db_columns';
import { Response } from '../models/response-model';
import { Packager } from '../../helper/packager';
import { BuildAPIs, ThoughtAPIs } from '../../helper/constants/db_schemas';
import { ThoughtRequest } from '../models/thoughts-request';

@Injectable({
  providedIn: 'root'
})
export class ThoughtService {

  private api: string = "thoughts";
  constructor(private http: HttpClient) { }

  public addThought(thought: ThoughtRequest): Observable<Response> {

    return this.http.post<any>(BuildAPIs.build_url(ThoughtAPIs.ADD, this.api), Packager.packThoughtForPOST(thought)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getAll(thought: ThoughtRequest): Observable<Response> {

    return this.http.get<any>(BuildAPIs.build_url(ThoughtAPIs.GET_ALL, this.api, `&${UserParts.ID}=${thought.user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getOne(thought: ThoughtRequest): Observable<Response> {

    return this.http.get<any>(BuildAPIs.build_url(ThoughtAPIs.GET_ONE, this.api, `&${UserParts.ID}=${thought.user_id}&${ThoughtParts.ID}=${thought.thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getBy(thought: ThoughtRequest): Observable<Response> {

    return this.http.get<any>(BuildAPIs.build_url(ThoughtAPIs.GET_BY, this.api, `&${UserParts.ID}=${thought.user_id}&${ThoughtParts.OWNER_ID}=${thought.owner_id}&${ThoughtParts.OFFSET}=${thought.offset}&${ThoughtParts.QUANTITY}=${thought.quantity}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getByUsers(thought: ThoughtRequest): Observable<Response> {

    let params: string = "";
    thought.owner_ids?.forEach(s => params += `&${ThoughtParts.OWNER_ID}[]=${s}`);
    return this.http.get<any>(BuildAPIs.build_url(ThoughtAPIs.GET_BY_USERS, this.api, `&${UserParts.ID}=${thought.user_id}&${ThoughtParts.OWNER_ID}=${thought.owner_id}${params}&${ThoughtParts.OFFSET}=${thought.offset}&${ThoughtParts.QUANTITY}=${thought.quantity}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public update(thought: ThoughtRequest): Observable<Response> {

    return this.http.post<any>(BuildAPIs.build_url(ThoughtAPIs.UPDATE, this.api), Packager.packThoughtForPOST(thought)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public delete(thought: ThoughtRequest): Observable<Response> {

    return this.http.get<any>(BuildAPIs.build_url(ThoughtAPIs.DELETE, this.api, `&${ThoughtParts.ID}=${thought.thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  

}
