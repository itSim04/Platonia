import { UtilityAPIs } from './../../helper/constants/db_schemas';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { BuildAPIs, ThoughtAPIs } from "src/app/helper/constants/db_schemas";
import { Packager } from "src/app/helper/packager";
import { ResponseReceipt } from "../models/request-models";

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    private api: string = "utilities";
    constructor(private http: HttpClient) { }

    // Sends a verification code by email
    public sendCode(email: string, code: string): Observable<ResponseReceipt> {

        return this.http.get<any>(BuildAPIs.build_url(UtilityAPIs.SEND_CODE, this.api, `&email=${email}&code=${code}`)).pipe(map((data: any) =>

            Packager.responseUnpack(data)

        ));

    }

}
