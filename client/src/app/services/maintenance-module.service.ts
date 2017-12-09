import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {catchError, map, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";

import {WarrentyDetails} from "../models/warrenty-details";

import {MessageService} from "./MessageService";

import {apiUrl} from "./common";



@Injectable()
export class MaintenanceModuleService {


}
