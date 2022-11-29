import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIS, THOUGHTS, THOUGHTS_SCHEMA, USERS } from '../constants';
import { RESPONSE_MODEL } from '../models/response-model';
import { Thought, THOUGHTS_RESPONSE } from '../models/thoughts-model';
import { Packager } from '../packager';

@Injectable({
  providedIn: 'root'
})
export class ThoughtService {

  private api: string = "thoughts";
  constructor(private http: HttpClient) { }

  public addThought(thought: THOUGHTS_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.post<any>(APIS.build_url(THOUGHTS_SCHEMA.ADD, this.api), Packager.packThoughtForPOST(thought)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getAll(thought: THOUGHTS_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(THOUGHTS_SCHEMA.GET_ALL, this.api, `&${USERS.ID}=${thought.user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getOne(thought: THOUGHTS_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(THOUGHTS_SCHEMA.GET_ONE, this.api, `&${USERS.ID}=${thought.user_id}&${THOUGHTS.ID}=${thought.thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getBy(thought: THOUGHTS_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(THOUGHTS_SCHEMA.GET_BY, this.api, `&${USERS.ID}=${thought.user_id}&${THOUGHTS.OWNER_ID}=${thought.owner_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public update(thought: THOUGHTS_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.post<any>(APIS.build_url(THOUGHTS_SCHEMA.UPDATE, this.api), Packager.packThoughtForPOST(thought)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public delete(thought: THOUGHTS_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(THOUGHTS_SCHEMA.DELETE, this.api, `&${THOUGHTS.ID}=${thought.thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  

}
