import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { APIS, LIKES_SCHEMA, LIKES, PLATONS_SCHEMA, PLATONS } from '../constants';
import { RESPONSE_MODEL } from '../models/response-model';
import { Packager } from '../packager';

@Injectable({
  providedIn: 'root'
})
export class PlatonService {

  api: string = "platons";
  constructor(private http: HttpClient) { }

  public platon(user_id: number, thought_id: number): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(PLATONS_SCHEMA.PLATON, this.api, `&${PLATONS.USER_ID}=${user_id}&${PLATONS.THOUGHT_ID}=${thought_id}&${PLATONS.PLATON_DATE}=${new Date().toISOString().slice(0, 19).replace('T', ' ')}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public unplaton(user_id: number, thought_id: number): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(PLATONS_SCHEMA.UNPLATON, this.api, `&${PLATONS.USER_ID}=${user_id}&${PLATONS.THOUGHT_ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }
}
