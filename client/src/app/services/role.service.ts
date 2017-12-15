import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Role} from "../models/role";

import {apiUrl} from "./common";

@Injectable()
export class RoleService {

  constructor(private http: HttpClient) { }

  private url = apiUrl + 'role';
  getAll (): Observable<Role[]> {
    return this.http.get<Role[]>(this.url);
  }
  getById (id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
  insert (obj: Role): Observable<any> {
    return this.http.post<any>(`${this.url}`, obj);
  }
  update (obj: Role): Observable<any> {
    return this.http.put<any>(`${this.url}`, obj);
  }
  remove (id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
