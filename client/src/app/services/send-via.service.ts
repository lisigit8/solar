import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {SendVia} from "../models/sendVia";

import {apiUrl} from "./common";
import {Site} from "../models/site";
import {WarrentyDetails} from "../models/warrentyDetails";

@Injectable()
export class SendViaService {

  constructor(private http: HttpClient) { }

  private sendViaUrl = apiUrl + 'sendVia';
  getSendVia (): Observable<SendVia[]> {
    return this.http.get<SendVia[]>(this.sendViaUrl);
  }
  insertSendVia (obj: SendVia): Observable<any> {
    return this.http.post<any>(`${this.sendViaUrl}`, obj);
  }

}
