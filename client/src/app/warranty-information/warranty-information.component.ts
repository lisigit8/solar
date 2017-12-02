import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WarrentyDetails} from "../models/warrenty-details";
import {MaintenanceModuleService} from "../services/maintenance-module.service";
import {Site} from "../models/site";
import {Device} from "../models/device";
import {Vendor} from "../models/vendor";
import {Contractor} from "../models/contractor";

@Component({
  selector: 'app-warranty-information',
  templateUrl: './warranty-information.component.html',
  styleUrls: ['../sites/sites.component.css']
})
export class WarrantyInformationComponent implements OnInit {
  /*@Input()*/
  sites: Site[];

  /*@Output()
  evt: EventEmitter<string> = new EventEmitter();*/

  devices: Device[];
  vendors: Vendor[];
  contractors: Contractor[];

  wd: WarrentyDetails;
  id: string = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute,
              private service: MaintenanceModuleService) { }

  /*clickme() {
    this.evt.emit('a');
  }*/
  onSiteSelect1(site: Site): void {
    /*alert(site.name);
    alert(this.selectedSite.name);*/
  }
  onSiteSelect(): void {
    //alert(this.selectedSiteId);
  }
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
  getWarrantyDetailsByWarrantyId(id: string): void {
    this.service.getWarrantyDetailsByWarrantyId(id)
      .subscribe(wd =>{
        debugger;
        this.wd = wd;
      });
  }

  ngOnInit() {
    this.getSites();
    this.getDevices();
    this.getVendors();
    this.getContractors();
    this.getWarrantyDetailsByWarrantyId(this.id);
  }

  updateWarrantyInfo() {
     this.service.updateWarrantyInfo(this.wd)
       .subscribe(resp => alert(resp.msg));
    //alert(this.wd.auto_renewal);
  }
}
