import { Component, OnInit } from '@angular/core';
import {Site} from "../models/site";
import {WarrentyDetails} from "../models/warrenty-details";
import {MaintenanceModuleService} from "../services/maintenance-module.service";
import {Contractor} from "../models/contractor";
import {ActivatedRoute} from "@angular/router";
import {Device} from "../models/device";
import {Vendor} from "../models/vendor";

@Component({
  selector: 'app-insert-warranty-details',
  templateUrl: './insert-warranty-details.component.html',
  styleUrls: ['../sites/sites.component.css']
})
export class InsertWarrantyDetailsComponent implements OnInit {
  wd: WarrentyDetails = new WarrentyDetails;

  devices: Device[];
  vendors: Vendor[];
  sites: Site[];
  contractors: Contractor[];

  constructor(private route: ActivatedRoute,
              private service: MaintenanceModuleService) { }

  getSites(): void {
    this.service.getSites()
      .subscribe(sites => this.sites = sites);
  }
  getDevices(): void {
    this.service.getDevices()
      .subscribe(devices => this.devices = devices);
  }
  getVendors(): void {
    this.service.getVendors()
      .subscribe(vendors => this.vendors = vendors);
  }
  getContractors(): void {
    this.service.getContractors()
      .subscribe(contractors => this.contractors = contractors);
  }

  ngOnInit() {
    this.getSites();
    this.getDevices();
    this.getVendors();
    this.getContractors();
  }

  insertWarrantyInfo() {
    this.service.insertWarrantyInfo(this.wd)
      .subscribe(resp => alert(resp.msg));
  }
}
