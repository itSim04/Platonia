import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { INTERESTED_IN, INTERESTS } from '../../helper/constants/db_columns';
import { INTEREST_RESPONSE } from '../models/interests-model';
import { RESPONSE } from '../models/response-model';
import { Packager } from '../../helper/packager';
import { APIS, INTERESTS_SCHEMA } from '../../helper/constants/db_schemas';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  private api: string = "interests";
  constructor(private http: HttpClient) { }

  public addInterest(interest: INTEREST_RESPONSE): Observable<RESPONSE> {

    return this.http.post<any>(APIS.build_url(INTERESTS_SCHEMA.ADD, this.api), Packager.packInterestForPOST(interest)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getAll(interest: INTEREST_RESPONSE): Observable<RESPONSE> {

    return this.http.get<any>(APIS.build_url(INTERESTS_SCHEMA.GET_ALL, this.api, `&${INTERESTED_IN.USER_ID}=${interest.user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getOne(interest: INTEREST_RESPONSE): Observable<RESPONSE> {

    return this.http.get<any>(APIS.build_url(INTERESTS_SCHEMA.GET_ONE, this.api, `&${INTERESTS.ID}=${interest.interest_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getUsers(interest: INTEREST_RESPONSE): Observable<RESPONSE> {

    return this.http.get<any>(APIS.build_url(INTERESTS_SCHEMA.GET_USERS, this.api, `&${INTERESTED_IN.INTEREST_ID}=${interest.interest_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public enrollUser(interest: INTEREST_RESPONSE): Observable<RESPONSE> {

    return this.http.get<any>(APIS.build_url(INTERESTS_SCHEMA.ENROLL_USER, this.api, `&${INTERESTED_IN.INTEREST_ID}=${interest.interest_id}&${INTERESTED_IN.USER_ID}=${interest.user_id}&${INTERESTED_IN.INTEREST_DATE}=${new Date().toISOString()}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public unenrollUser(interest: INTEREST_RESPONSE): Observable<RESPONSE> {


    return this.http.get<any>(APIS.build_url(INTERESTS_SCHEMA.UNENROLL_USER, this.api, `&${INTERESTED_IN.INTEREST_ID}=${interest.interest_id}&${INTERESTED_IN.USER_ID}=${interest.user_id}&${INTERESTED_IN.INTEREST_DATE}=${new Date().toISOString()}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public checkName(interest: INTEREST_RESPONSE): Observable<RESPONSE> {

    return this.http.get<any>(APIS.build_url(INTERESTS_SCHEMA.CHECK_NAME, this.api, `&${INTERESTS.NAME}=${interest.name}`)).pipe(map((data: any) =>

    Packager.responseUnpack(data)

  ));


  }

  public getInterestsOfUser(interest: INTEREST_RESPONSE): Observable<RESPONSE> {

    return this.http.get<any>(APIS.build_url(INTERESTS_SCHEMA.GET_INTERESTS, this.api, `&${INTERESTED_IN.USER_ID}=${interest.user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public uploadPicture(interest: INTEREST_RESPONSE) {

    return this.http.post<any>(APIS.build_url(INTERESTS_SCHEMA.UPLOAD_LOGO, this.api), Packager.packInterestForPOST(interest)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }
}
