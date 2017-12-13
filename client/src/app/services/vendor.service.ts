import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Vendor} from "../models/vendor";

import {apiUrl} from "./common";

@Injectable()
export class VendorService {

  constructor(private http: HttpClient) { }

  private url = apiUrl + 'vendor';
  getVendors (): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.url);
  }
  getVendorsBySiteId (site_id: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.url}/site/${site_id}`);
  }
  getByName (name: string): Observable<any> {
    return this.http.get<any>(`${this.url}/name/${name}`);
  }
  insert (obj: Vendor): Observable<any> {
    return this.http.post<any>(`${this.url}`, obj);
  }
  update (obj: Vendor): Observable<any> {
    return this.http.put<any>(`${this.url}`, obj);
  }
  remove (id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
