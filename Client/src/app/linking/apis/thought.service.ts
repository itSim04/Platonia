import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {  ThoughtParts, UserParts } from '../../helper/constants/db_columns';
import { ResponseReceipt } from '../models/request-models';
import { Packager } from '../../helper/packager';
import { BuildAPIs, ThoughtAPIs } from '../../helper/constants/db_schemas';
import { ThoughtRequest } from '../models/request-models';

@Injectable({
  providedIn: 'root'
})
export class ThoughtService {

  private api: string = "thoughts";
  constructor(private http: HttpClient) { }

  // Adds a thought (takes a type, an owner id, a share date and everything related to the type)
  public addThought(thought: ThoughtRequest): Observable<ResponseReceipt> {

    return this.http.post<any>(BuildAPIs.build_url(ThoughtAPIs.ADD, this.api), Packager.packThoughtForPOST(thought)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Gets all thoughts (takes a user id and can take a root id)
  public getAll(thought: ThoughtRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(ThoughtAPIs.GET_ALL, this.api, `&${UserParts.ID}=${thought.user_id}` + (thought.root_id != undefined ? `&${ThoughtParts.ROOT}=${thought.root_id}` : ''))).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Gets one thought (takes a thought id and a user id)
  public getOne(thought: ThoughtRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(ThoughtAPIs.GET_ONE, this.api, `&${UserParts.ID}=${thought.user_id}&${ThoughtParts.ID}=${thought.thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Gets thoughts by a user (takes a user id and an owner id)
  public getBy(thought: ThoughtRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(ThoughtAPIs.GET_BY, this.api, `&${UserParts.ID}=${thought.user_id}&${ThoughtParts.OWNER_ID}=${thought.owner_id}&${ThoughtParts.OFFSET}=${thought.offset}&${ThoughtParts.QUANTITY}=${thought.quantity}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Gets thoughts by users (takes a user id and owner ids)
  public getByUsers(thought: ThoughtRequest): Observable<ResponseReceipt> {

    let params: string = "";
    thought.owner_ids?.forEach(s => params += `&${ThoughtParts.OWNER_ID}[]=${s}`);
    return this.http.get<any>(BuildAPIs.build_url(ThoughtAPIs.GET_BY_USERS, this.api, `&${UserParts.ID}=${thought.user_id}&${ThoughtParts.OWNER_ID}=${thought.owner_id}${params}&${ThoughtParts.OFFSET}=${thought.offset}&${ThoughtParts.QUANTITY}=${thought.quantity}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Updates a thought (can take any combination of thought properties)
  public update(thought: ThoughtRequest): Observable<ResponseReceipt> {

    return this.http.post<any>(BuildAPIs.build_url(ThoughtAPIs.UPDATE, this.api), Packager.packThoughtForPOST(thought)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Deletes a thought (takes a thought id)
  public delete(thought: ThoughtRequest): Observable<ResponseReceipt> {

    console.log("Deleting");
    return this.http.get<any>(BuildAPIs.build_url(ThoughtAPIs.DELETE, this.api, `&${ThoughtParts.ID}=${thought.thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  

}
