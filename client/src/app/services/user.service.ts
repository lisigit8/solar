import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Users} from "../models/users";

import {apiUrl} from "./common";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private url = apiUrl + 'user';
  getAll (): Observable<Users[]> {
    return this.http.get<Users[]>(this.url);
  }
  getById (id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
  insert (obj: Users): Observable<any> {
    return this.http.post<any>(`${this.url}`, obj);
  }
  /*update (obj: Users): Observable<any> {
    return this.http.put<any>(`${this.url}`, obj);
  }*/
  remove (id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
