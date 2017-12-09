import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Vendor} from "../models/vendor";

import {apiUrl} from "./common";

@Injectable()
export class VendorService {

  constructor(private http: HttpClient) { }

  private vendorUrl = apiUrl + 'vendor';
  getVendors (): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.vendorUrl);
  }
  getVendorsBySiteId (site_id: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.vendorUrl}/site/${site_id}`);
  }

}
