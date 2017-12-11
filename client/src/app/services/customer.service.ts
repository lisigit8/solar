import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Customer} from "../models/customer";

import {apiUrl} from "./common";

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }

  private url = apiUrl + 'customer';
  getCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }
  insert (obj: Customer): Observable<any> {
    return this.http.post<any>(`${this.url}`, obj);
  }
  update (obj: Customer): Observable<any> {
    return this.http.put<any>(`${this.url}`, obj);
  }
  remove (id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
