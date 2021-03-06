import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Site} from "../models/site";

import {apiUrl} from "./common";

@Injectable()
export class SiteService {

  constructor(private http: HttpClient) { }

  private url = apiUrl + 'site';
  getSites (): Observable<Site[]> {
    return this.http.get<Site[]>(this.url);
  }
  getByName (name: string): Observable<any> {
    return this.http.get<any>(`${this.url}/name/${name}`);
  }
  insert (obj: Site): Observable<any> {
    return this.http.post<any>(`${this.url}`, obj);
  }
  update (obj: Site): Observable<any> {
    return this.http.put<any>(`${this.url}`, obj);
  }
  remove (id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
