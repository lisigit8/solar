import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Contractor} from "../models/contractor";

import {apiUrl} from "./common";

@Injectable()
export class ContractorService {

  constructor(private http: HttpClient) { }

  private url = apiUrl + 'contractor';
  getContractors (): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(this.url);
  }
  getContractorsBySiteId (site_id: string): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(`${this.url}/site/${site_id}`);
  }
  insert (obj: Contractor): Observable<any> {
    return this.http.post<any>(`${this.url}`, obj);
  }
  update (obj: Contractor): Observable<any> {
    return this.http.put<any>(`${this.url}`, obj);
  }
  remove (id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
