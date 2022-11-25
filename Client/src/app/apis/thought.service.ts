import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIS, THOUGHTS_SCHEMA } from '../constants';
import { RESPONSE_MODEL } from '../models/response-model';
import { THOUGHT, THOUGHTS_RESPONSE } from '../models/thoughts-model';
import { Packager } from '../packager';

@Injectable({
  providedIn: 'root'
})
export class ThoughtService {

  private api: string = "thoughts";
  constructor(private http: HttpClient) { }

  public addThought(thought: THOUGHTS_RESPONSE): Observable<RESPONSE_MODEL> {

    return this.http.post<any>(APIS.build_url(THOUGHTS_SCHEMA.ADD, this.api), Packager.packThoughtForPOST(thought)).pipe(map((data: any) =>

      Packager.responseUnpack(data)

    ));

  }

  // public getAll(thought: THOUGHTS_RESPONSE): Observable<RESPONSE_MODEL> {



  // }

  // public getOne(thought: THOUGHTS_RESPONSE): Observable<RESPONSE_MODEL> {



  // }

  // public getBy(thought: THOUGHTS_RESPONSE): Observable<RESPONSE_MODEL> {



  // }

  // public update(thought: THOUGHTS_RESPONSE): Observable<RESPONSE_MODEL> {



  // }

  // public delete(thought: THOUGHTS_RESPONSE): Observable<RESPONSE_MODEL> {



  // }

}
