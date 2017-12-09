import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Site} from "../models/site";

import {apiUrl} from "./common";

@Injectable()
export class SiteService {

  constructor(private http: HttpClient) { }

  private siteUrl = apiUrl + 'site';
  getSites (): Observable<Site[]> {
    return this.http.get<Site[]>(this.siteUrl);
  }

}
