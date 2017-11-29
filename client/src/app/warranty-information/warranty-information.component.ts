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

  sms: string = "sms";
  email: string = "email";

  selectedSite: Site;
  selectedSiteId: string;
  selectedDeviceId: string;
  devices: Device[];
  vendors: Vendor[];
  selectedVendorId: string;
  start_date: Date;
  wd: WarrentyDetails;
  id: string = this.route.snapshot.paramMap.get('id');
  contractors: Contractor[];
  selectedContractorId: string;

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
        this.wd = wd;
        this.selectedSite = wd.site;
        this.selectedSiteId = wd.site._id;
        this.selectedDeviceId = wd.device_id;
        this.selectedVendorId = wd.vendor_id;
        this.start_date = wd.start_date;
        this.selectedContractorId = wd.contractor_id;
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

    this.wd.id=this.wd._id;
    this.wd.vendor = this.wd.vendor_id;
    this.wd.contractor = this.wd.contractor_id;
    this.wd.device = this.wd.device_id;
     this.service.updateWarrantyInfo(this.wd)
       .subscribe(resp => console.log(JSON.stringify(resp)));
    //alert(this.wd.auto_renewal);
  }
}
