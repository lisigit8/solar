import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Device} from "../models/device";

import {apiUrl} from "./common";

@Injectable()
export class DeviceService {

  constructor(private http: HttpClient) { }

  private deviceUrl = apiUrl + 'device';
  getDevices (): Observable<Device[]> {
    return this.http.get<Device[]>(this.deviceUrl);
  }
  getDeviceBySiteId (site_id: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.deviceUrl}/site/${site_id}`);
  }

}
