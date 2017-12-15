import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";

import {WarrentyDetails} from "../models/warrentyDetails";
import {Warranty_SendVia} from "../models/warranty-sendvia";

import {apiUrl} from "./common";

import {MessageService} from "./MessageService";

/*const httpOptions = {
  headers: new HttpHeaders({
    'token':
      localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).token : ''
  })
};*/

@Injectable()
export class WarrantyService {

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  //Warranty Info
  private warrantyInfoUrl = apiUrl + 'warrantyInfo';

  updateWarrantyInfo(obj: WarrentyDetails): Observable<any> {
    return this.http.put<any>(`${this.warrantyInfoUrl}`, obj);
  }

  insertWarrantyInfo(obj: WarrentyDetails): Observable<any> {
    return this.http.post<any>(`${this.warrantyInfoUrl}`, obj);
  }

  removeWarrantyInfo(id: string): Observable<any> {
    return this.http.delete<any>(`${this.warrantyInfoUrl}/${id}`)
      .pipe(
        tap(resp => this.log('Deleted Successfully!')),
        catchError(this.handleError('removeWarrantyInfo', []))
      );
  }

  //Warranty Details
  private warrantyDetailsUrl = apiUrl + 'warrantyDetails';

  getWarrantyDetails(): Observable<WarrentyDetails[]> {
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}`);
  }

  getWarrantyDetailsByWarrantyId(warranty_id: string): Observable<WarrentyDetails> {
    return this.http.get<WarrentyDetails>(`${this.warrantyDetailsUrl}/warranty/${warranty_id}`);
  }

  getWarrantyDetailsBySiteId(site_id: string): Observable<WarrentyDetails[]> {
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}/site/${site_id}`);
  }

  getWarrantyDetailsBySiteAndDeviceId(site_id: string, device_id: string): Observable<WarrentyDetails[]> {
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}/site/${site_id}/device/${device_id}`);
  }

  getWarrantyDetailsBySiteAndDeviceNameId(site_id: string, deviceName_id: string): Observable<WarrentyDetails[]> {
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}/site/${site_id}/deviceName/${deviceName_id}`);
  }

  getWarrantyDetailsBySiteAndVendorId(site_id: string, vendor_id: string): Observable<WarrentyDetails[]> {
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}/site/${site_id}/vendor/${vendor_id}`);
  }

  getWarrantyDetailsBySiteAndContractorId(site_id: string, contractor_id: string): Observable<WarrentyDetails[]> {
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}/site/${site_id}/contractor/${contractor_id}`);
  }

  /*getWarrantyDetailsByMultiSiteId(site_ids: string[]): Observable<WarrentyDetails[]> {
    var options = {
      "params": {
        "site-ids": site_ids
      }
    };
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}/site`, options);
  }*/


  //Warranty Info - Send Via
  private warrantyInfoSendViaUrl = apiUrl + 'warrantyInfo_sendVia';

  updateWarrantyInfoSendVia(obj: Warranty_SendVia): Observable<any> {
    return this.http.put<any>(`${this.warrantyInfoSendViaUrl}`, obj);
  }

  insertWarrantyInfoSendVia(obj: Warranty_SendVia): Observable<any> {
    return this.http.post<any>(`${this.warrantyInfoSendViaUrl}`, obj);
  }

  removeWarrantyInfoSendVia(id: string): Observable<any> {
    return this.http.delete<any>(`${this.warrantyInfoSendViaUrl}/${id}`);
  }

  getWarrantyInfoSendViaByWarrantyId(warranty_id: string): Observable<Warranty_SendVia[]> {
    return this.http.get<Warranty_SendVia[]>(`${this.warrantyInfoSendViaUrl}/warranty/${warranty_id}`);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for customer consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
  }

}
