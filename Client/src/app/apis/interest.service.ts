import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIS, INTERESTED_IN, INTERESTS, INTERESTS_SCHEMA, THOUGHTS_SCHEMA } from '../constants';
import { INTEREST_RESPONSE } from '../models/interests-model';
import { RESPONSE_MODEL } from '../models/response-model';
import { Packager } from '../packager';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  private api: string = "interests";
  constructor(private http: HttpClient) { }

  public addInterest(interest: INTEREST_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.post<any>(APIS.build_url(INTERESTS_SCHEMA.ADD, this.api), Packager.packInterestForPOST(interest)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getAll(): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(INTERESTS_SCHEMA.GET_ALL, this.api)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getOne(interest: INTEREST_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(INTERESTS_SCHEMA.GET_ONE, this.api, `&${INTERESTS.ID}=${interest.interest_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getUsers(interest: INTEREST_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(INTERESTS_SCHEMA.GET_USERS, this.api, `&${INTERESTED_IN.INTEREST_ID}=${interest.interest_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // public enrollUser(interest: INTEREST_RESPONSE): Observable<RESPONSE_MODEL> {



  // }

  // public unenrollUser(interest: INTEREST_RESPONSE): Observable<RESPONSE_MODEL> {



  // }

  // public checkName(interest: INTEREST_RESPONSE): Observable<RESPONSE_MODEL> {



  // }

  public getInterestsOfUser(interest: INTEREST_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(INTERESTS_SCHEMA.GET_INTERESTS, this.api, `&${INTERESTED_IN.USER_ID}=${interest.user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }
}
