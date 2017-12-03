import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Site} from "../models/site";
import {WarrentyDetails} from "../models/warrenty-details";
import {Device} from "../models/device";
import {Vendor} from "../models/vendor";
import {Contractor} from "../models/contractor";
import {Users} from "../models/users";
import {Documents} from "../models/documents";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = 'http://localhost:3000/api/';

@Injectable()
export class MaintenanceModuleService {

  constructor(private http: HttpClient) { }


  // Site
  private siteUrl = apiUrl + 'site';
  getSites (): Observable<Site[]> {
    return this.http.get<Site[]>(this.siteUrl);
  }

  // User
  private userUrl = apiUrl + 'user';
  getUsers (): Observable<Users[]> {
    return this.http.get<Users[]>(this.userUrl);
  }

  //Documents
  private docUrl = apiUrl + 'documents';
  getDocumentsByWarrantyId (warranty_id: string): Observable<Documents[]> {
    return this.http.get<Documents[]>(`${this.docUrl}/warranty/${warranty_id}`);
  }
  insertDocs (data: any): Observable<Array<any>> {
    return this.http.post<Array<any>>(`${this.docUrl}`, data);
  }
  updateDocument (obj: Documents): Observable<any> {
    return this.http.put<any>(`${this.docUrl}`, obj);
  }
  getDocumentsById (id: string): Observable<Documents> {
    return this.http.get<Documents>(`${this.docUrl}/${id}`);
  }

  //Warranty Info
  private warrantyInfoUrl = apiUrl + 'warrantyInfo';
  updateWarrantyInfo (obj: WarrentyDetails): Observable<any> {
    return this.http.put<any>(`${this.warrantyInfoUrl}`, obj);
  }
  insertWarrantyInfo (obj: WarrentyDetails): Observable<any> {
    return this.http.post<any>(`${this.warrantyInfoUrl}`, obj);
  }
  removeWarrantyInfo (id: string): Observable<any> {
    return this.http.delete<any>(`${this.warrantyInfoUrl}/${id}`);
  }

  //Warranty Details
  private warrantyDetailsUrl = apiUrl + 'warrantyDetails';
  getWarrantyDetails (): Observable<WarrentyDetails[]> {
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}`);
  }
  getWarrantyDetailsByWarrantyId (warranty_id: string): Observable<WarrentyDetails> {
    return this.http.get<WarrentyDetails>(`${this.warrantyDetailsUrl}/warranty/${warranty_id}`);
  }
  getWarrantyDetailsBySiteId (site_id: string): Observable<WarrentyDetails[]> {
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}/site/${site_id}`);
  }
  getWarrantyDetailsBySiteAndDeviceId (site_id: string, device_id: string): Observable<WarrentyDetails[]> {
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}/site/${site_id}/device/${device_id}`);
  }
  getWarrantyDetailsBySiteAndVendorId (site_id: string, vendor_id: string): Observable<WarrentyDetails[]> {
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}/site/${site_id}/vendor/${vendor_id}`);
  }
  getWarrantyDetailsBySiteAndContractorId (site_id: string, contractor_id: string): Observable<WarrentyDetails[]> {
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}/site/${site_id}/contractor/${contractor_id}`);
  }
  getWarrantyDetailsByMultiSiteId (site_ids: string[]): Observable<WarrentyDetails[]> {
    var options={"params":{
      "site-ids":site_ids
    }};
    return this.http.get<WarrentyDetails[]>(`${this.warrantyDetailsUrl}/site`,options);
  }

  //Device
  private deviceUrl = apiUrl + 'device';
  getDevices (): Observable<Device[]> {
    return this.http.get<Device[]>(this.deviceUrl);
  }
  getDeviceBySiteId (site_id: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.deviceUrl}/site/${site_id}`);
  }

  // Vendor
  private vendorUrl = apiUrl + 'vendor';
  getVendors (): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.vendorUrl);
  }
  getVendorsBySiteId (site_id: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.vendorUrl}/site/${site_id}`);
  }

  // Contractor
  private contractorUrl = apiUrl + 'contractor';
  getContractors (): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(this.contractorUrl);
  }
  getContractorsBySiteId (site_id: string): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(`${this.contractorUrl}/site/${site_id}`);
  }

}
