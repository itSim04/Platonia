import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LikeParts, PlatonParts } from '../../helper/constants/db_columns';
import { Response } from '../models/response-model';
import { Packager } from '../../helper/packager';
import { BuildAPIs, PlatonAPIs } from '../../helper/constants/db_schemas';

@Injectable({
  providedIn: 'root'
})
export class PlatonService {

  api: string = "platons";
  constructor(private http: HttpClient) { }

  public platon(user_id: number, thought_id: number): Observable<Response> {

    return this.http.get<any>(BuildAPIs.build_url(PlatonAPIs.PLATON, this.api, `&${PlatonParts.USER_ID}=${user_id}&${PlatonParts.THOUGHT_ID}=${thought_id}&${PlatonParts.PLATON_DATE}=${new Date()}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public unplaton(user_id: number, thought_id: number): Observable<Response> {

    return this.http.get<any>(BuildAPIs.build_url(PlatonAPIs.UNPLATON, this.api, `&${PlatonParts.USER_ID}=${user_id}&${PlatonParts.THOUGHT_ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getPlatonsByUser(user_id: number): Observable<Response> {
    
    return this.http.get<any>(BuildAPIs.build_url(PlatonAPIs.GET_PLATONS_BY_USER, this.api, `&${PlatonParts.USER_ID}=${user_id}`)).pipe(map((data: any) =>
    
    Packager.responseUnpack(data)
    
    ));
    
  }

  public getPlatonsOnThought(thought_id: number): Observable<Response> {

    return this.http.get<any>(BuildAPIs.build_url(PlatonAPIs.GET_PLATONS_ON_THOUGHT, this.api, `&${PlatonParts.THOUGHT_ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }
}
