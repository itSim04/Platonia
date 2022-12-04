import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ANSWERS, OPTIONS } from '../helper/constants/db_columns';
import { RESPONSE_MODEL } from '../models/response-model';
import { Packager } from '../helper/packager';
import { APIS, POLLS_SCHEMA } from '../helper/constants/db_schemas';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  api: string = "polls";
  constructor(private http: HttpClient) { }

  public answer_poll(user_id: number, thought_id: number, option: number): Observable<RESPONSE_MODEL> {

    const form: FormData = new FormData();
    form.append(ANSWERS.USER_ID, String(user_id));
    form.append(ANSWERS.OPTION_CHOSEN, String(option));
    form.append(ANSWERS.THOUGHT_ID, String(thought_id));
    form.append(ANSWERS.ANSWER_DATE, String(new Date().toISOString()));
    return this.http.post<any>(APIS.build_url(POLLS_SCHEMA.ANSWER_POLL, this.api), form).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  public get_option(thought_id: number): Observable<RESPONSE_MODEL> {

    return this.http.get<any>(APIS.build_url(POLLS_SCHEMA.GET_OPTION, this.api, `&${OPTIONS.ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

}
