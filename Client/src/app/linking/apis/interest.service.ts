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

  // Adds an interest (Takes a name and an image)
  public addInterest(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.post<any>(BuildAPIs.build_url(InterestAPIs.ADD, this.api), Packager.packInterestForPOST(interest)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Gets all interests (takes a user id)
  public getAll(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.GET_ALL, this.api, `&${InterestPivotParts.USER_ID}=${interest.user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Gets one interest (takes an interest id)
  public getOne(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.GET_ONE, this.api, `&${InterestParts.ID}=${interest.interest_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Gets all users enrolled in an interest (takes an interest id)
  public getUsers(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.GET_USERS, this.api, `&${InterestPivotParts.INTEREST_ID}=${interest.interest_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Enrolls a user to an interest (takes an interest id and a user id)
  public enrollUser(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.ENROLL_USER, this.api, `&${InterestPivotParts.INTEREST_ID}=${interest.interest_id}&${InterestPivotParts.USER_ID}=${interest.user_id}&${InterestPivotParts.INTEREST_DATE}=${new Date().toISOString()}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Unenrolls a user from an interest (takes an interest id and a user id)
  public unenrollUser(interest: InterestRequest): Observable<ResponseReceipt> {


    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.UNENROLL_USER, this.api, `&${InterestPivotParts.INTEREST_ID}=${interest.interest_id}&${InterestPivotParts.USER_ID}=${interest.user_id}&${InterestPivotParts.INTEREST_DATE}=${new Date().toISOString()}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Checks if an interest name is available (takes an interest name)
  public checkName(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.CHECK_NAME, this.api, `&${InterestParts.NAME}=${interest.name}`)).pipe(map((data: any) =>

    Packager.responseUnpack(data)

  ));


  }

  // Gets all interest by a user (takes a user id)
  public getInterestsOfUser(interest: InterestRequest): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(InterestAPIs.GET_INTERESTS, this.api, `&${InterestPivotParts.USER_ID}=${interest.user_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Uploads a logo (takes an interest id and an image)
  public uploadPicture(interest: InterestRequest) {

    return this.http.post<any>(BuildAPIs.build_url(InterestAPIs.UPLOAD_LOGO, this.api), Packager.packInterestForPOST(interest)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }
}
