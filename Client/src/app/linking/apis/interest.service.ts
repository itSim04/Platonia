import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { InterestPivotParts, InterestParts } from "src/app/helper/constants/db_columns";
import { BuildAPIs, InterestAPIs } from "src/app/helper/constants/db_schemas";
import { Packager } from "src/app/helper/packager";
import { InterestRequest, ResponseReceipt } from "../models/request-models";

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  private api: string = "interests";
  constructor(private http: HttpClient) { }

  public addInterest(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.post<any>(BuildAPIs.build_url(InterestAPIs.ADD, this.api), Packager.packInterestForPOST(interest)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getAll(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.GET_ALL, this.api, `&${InterestPivotParts.USER_ID}=${interest.user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getOne(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.GET_ONE, this.api, `&${InterestParts.ID}=${interest.interest_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public getUsers(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.GET_USERS, this.api, `&${InterestPivotParts.INTEREST_ID}=${interest.interest_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public enrollUser(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.ENROLL_USER, this.api, `&${InterestPivotParts.INTEREST_ID}=${interest.interest_id}&${InterestPivotParts.USER_ID}=${interest.user_id}&${InterestPivotParts.INTEREST_DATE}=${new Date().toISOString()}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public unenrollUser(interest: InterestRequest): Observable<ResponseReceipt> {


    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.UNENROLL_USER, this.api, `&${InterestPivotParts.INTEREST_ID}=${interest.interest_id}&${InterestPivotParts.USER_ID}=${interest.user_id}&${InterestPivotParts.INTEREST_DATE}=${new Date().toISOString()}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public checkName(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.CHECK_NAME, this.api, `&${InterestParts.NAME}=${interest.name}`)).pipe(map((data: any) =>

    Packager.responseUnpack(data)

  ));


  }

  public getInterestsOfUser(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.GET_INTERESTS, this.api, `&${InterestPivotParts.USER_ID}=${interest.user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public uploadPicture(interest: InterestRequest) {

    return this.http.post<any>(BuildAPIs.build_url(InterestAPIs.UPLOAD_LOGO, this.api), Packager.packInterestForPOST(interest)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }
}
