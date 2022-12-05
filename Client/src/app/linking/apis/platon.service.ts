import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LIKES, PLATONS } from '../../helper/constants/db_columns';
import { RESPONSE } from '../models/response-model';
import { Packager } from '../../helper/packager';
import { APIS, PLATONS_SCHEMA } from '../../helper/constants/db_schemas';

@Injectable({
  providedIn: 'root'
})
export class PlatonService {

  api: string = "platons";
  constructor(private http: HttpClient) { }

  public platon(user_id: number, thought_id: number): Observable<RESPONSE> {

    return this.http.get<any>(APIS.build_url(PLATONS_SCHEMA.PLATON, this.api, `&${PLATONS.USER_ID}=${user_id}&${PLATONS.THOUGHT_ID}=${thought_id}&${PLATONS.PLATON_DATE}=${new Date()}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public unplaton(user_id: number, thought_id: number): Observable<RESPONSE> {

    return this.http.get<any>(APIS.build_url(PLATONS_SCHEMA.UNPLATON, this.api, `&${PLATONS.USER_ID}=${user_id}&${PLATONS.THOUGHT_ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getPlatonsByUser(user_id: number): Observable<RESPONSE> {
    
    return this.http.get<any>(APIS.build_url(PLATONS_SCHEMA.GET_PLATONS_BY_USER, this.api, `&${PLATONS.USER_ID}=${user_id}`)).pipe(map((data: any) =>
    
    Packager.responseUnpack(data)
    
    ));
    
  }

  public getPlatonsOnThought(thought_id: number): Observable<RESPONSE> {

    return this.http.get<any>(APIS.build_url(PLATONS_SCHEMA.GET_PLATONS_ON_THOUGHT, this.api, `&${PLATONS.THOUGHT_ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }
}
