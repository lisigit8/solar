import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Device} from "../models/device";

import {apiUrl} from "./common";

@Injectable()
export class DeviceService {

  constructor(private http: HttpClient) { }

  private url = apiUrl + 'device';
  getDevices (): Observable<Device[]> {
    return this.http.get<Device[]>(this.url);
  }
  getDevicesByDeviceNameId (deviceName_id: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.url}/deviceName/${deviceName_id}`);
  }
  getByID (ID: string): Observable<any> {
    return this.http.get<any>(`${this.url}/ID/${ID}`);
  }
  getDeviceBySiteId (site_id: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.url}/site/${site_id}`);
  }
  insert (obj: Device): Observable<any> {
    return this.http.post<any>(`${this.url}`, obj);
  }
  update (obj: Device): Observable<any> {
    return this.http.put<any>(`${this.url}`, obj);
  }
  remove (id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
