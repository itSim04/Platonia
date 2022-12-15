import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { PlatonParts } from "src/app/helper/constants/db_columns";
import { BuildAPIs, PlatonAPIs } from "src/app/helper/constants/db_schemas";
import { Packager } from "src/app/helper/packager";
import { ResponseReceipt } from "../models/request-models";


@Injectable({
  providedIn: 'root'
})
export class PlatonService {

  api: string = "platons";
  constructor(private http: HttpClient) { }

  // Lets the user platon the thought
  public platon(user_id: number, thought_id: number): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(PlatonAPIs.PLATON, this.api, `&${PlatonParts.USER_ID}=${user_id}&${PlatonParts.THOUGHT_ID}=${thought_id}&${PlatonParts.PLATON_DATE}=${new Date().toISOString()}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Lets the user unplaton the thought
  public unplaton(user_id: number, root_id: number): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(PlatonAPIs.UNPLATON, this.api, `&${PlatonParts.ROOT_ID}=${root_id}&${PlatonParts.USER_ID}=${user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Gets platons by a user
  public getPlatonsByUser(user_id: number): Observable<ResponseReceipt> {
    
    return this.http.get<any>(BuildAPIs.build_url(PlatonAPIs.GET_PLATONS_BY_USER, this.api, `&${PlatonParts.USER_ID}=${user_id}`)).pipe(map((data: any) =>
    
    Packager.responseUnpack(data)
    
    ));
    
  }

  // Gets platons on a thought
  public getPlatonsOnThought(thought_id: number): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(PlatonAPIs.GET_PLATONS_ON_THOUGHT, this.api, `&${PlatonParts.THOUGHT_ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }
}
