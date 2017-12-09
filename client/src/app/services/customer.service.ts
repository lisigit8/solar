import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Customer} from "../models/customer";

import {apiUrl} from "./common";

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }

  private customerUrl = apiUrl + 'customer';
  getCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl);
  }

}
