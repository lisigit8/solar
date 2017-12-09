import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Contractor} from "../models/contractor";

import {apiUrl} from "./common";

@Injectable()
export class ContractorService {

  constructor(private http: HttpClient) { }

  private contractorUrl = apiUrl + 'contractor';
  getContractors (): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(this.contractorUrl);
  }
  getContractorsBySiteId (site_id: string): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(`${this.contractorUrl}/site/${site_id}`);
  }

}
