import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {DeviceName} from "../models/deviceName";

import {apiUrl} from "./common";

@Injectable()
export class DeviceNameService {

  constructor(private http: HttpClient) { }

  private url = apiUrl + 'deviceName';
  getAll (): Observable<DeviceName[]> {
    return this.http.get<DeviceName[]>(this.url);
  }
  getById (id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
  insert (obj: DeviceName): Observable<any> {
    return this.http.post<any>(`${this.url}`, obj);
  }
  update (obj: DeviceName): Observable<any> {
    return this.http.put<any>(`${this.url}`, obj);
  }
  remove (id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
