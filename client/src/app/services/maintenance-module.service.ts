import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Site} from "../models/site";
import {WarrentyDetails} from "../models/warrenty-details";
import {Device} from "../models/device";
import {Vendor} from "../models/vendor";
import {Contractor} from "../models/contractor";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MaintenanceModuleService {

  constructor(private http: HttpClient) { }


  // Site
  private siteUrl = 'http://localhost:3000/api/site';
  getSites (): Observable<Site[]> {
    return this.http.get<Site[]>(this.siteUrl);
  }

  //Warranty Info
  private warrantyInfoUrl = 'http://localhost:3000/api/warrantyInfo';
  updateWarrantyInfo (obj: WarrentyDetails): Observable<any> {
    return this.http.put<any>(`${this.warrantyInfoUrl}`, obj);
  }
  insertWarrantyInfo (obj: WarrentyDetails): Observable<any> {
    return this.http.post<any>(`${this.warrantyInfoUrl}`, obj);
  }

  //Warranty Details
  private warrantyDetailsUrl = 'http://localhost:3000/api/warrantyDetails';
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
  private deviceUrl = 'http://localhost:3000/api/device';
  getDevices (): Observable<Device[]> {
    return this.http.get<Device[]>(this.deviceUrl);
  }
  getDeviceBySiteId (site_id: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.deviceUrl}/site/${site_id}`);
  }

  // Vendor
  private vendorUrl = 'http://localhost:3000/api/vendor';
  getVendors (): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.vendorUrl);
  }
  getVendorsBySiteId (site_id: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.vendorUrl}/site/${site_id}`);
  }

  // Contractor
  private contractorUrl = 'http://localhost:3000/api/contractor';
  getContractors (): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(this.contractorUrl);
  }
  getContractorsBySiteId (site_id: string): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(`${this.contractorUrl}/site/${site_id}`);
  }

}
