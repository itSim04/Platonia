import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AnswerParts, OptionParts } from '../../helper/constants/db_columns';
import { Packager } from '../../helper/packager';
import { BuildAPIs, PollAPIs } from '../../helper/constants/db_schemas';
import { ResponseReceipt } from '../models/request-models';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  api: string = "polls";
  constructor(private http: HttpClient) { }

  // Answers a poll
  public answer_poll(user_id: number, thought_id: number, option: number): Observable<ResponseReceipt> {

    const form: FormData = new FormData();
    form.append(AnswerParts.USER_ID, String(user_id));
    form.append(AnswerParts.OPTION_CHOSEN, String(option));
    form.append(AnswerParts.THOUGHT_ID, String(thought_id));
    form.append(AnswerParts.ANSWER_DATE, String(new Date().toISOString()));
    return this.http.post<any>(BuildAPIs.build_url(PollAPIs.ANSWER_POLL, this.api), form).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // Retrieves all options on a thought
  public get_option(thought_id: number): Observable<ResponseReceipt> {

    return this.http.get<any>(BuildAPIs.build_url(PollAPIs.GET_OPTION, this.api, `&${OptionParts.ID}=${thought_id}`)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

}
