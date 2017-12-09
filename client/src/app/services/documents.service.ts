import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Documents} from "../models/documents";

import {apiUrl} from "./common";

@Injectable()
export class DocumentsService {

  constructor(private http: HttpClient) { }

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
  removeDocument (id: string): Observable<any> {
    return this.http.delete<any>(`${this.docUrl}/${id}`);
  }

}
