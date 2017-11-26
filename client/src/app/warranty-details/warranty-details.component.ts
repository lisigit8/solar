import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {WarrentyDetails} from "../models/warrenty-details";
import {MaintenanceModuleService} from "../services/maintenance-module.service";
import {ActivatedRoute} from "@angular/router";
import {Site} from "../models/site";
import {Types} from "../models/types";
import {Device} from "../models/device";
import {Vendor} from "../models/vendor";
import {Contractor} from "../models/contractor";
import {FormControl} from "@angular/forms";
import {MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-warranty-details',
  templateUrl: './warranty-details.component.html',
  styleUrls: ['../sites/sites.component.css']
})

export class WarrantyDetailsComponent implements OnInit {
  warrantyDetailsList: WarrentyDetails[];
  sites: Site[];
  types: Types[] = [{
    _id: "1",
    type: "Device Name",
  },{
    _id: "2",
    type: "Device ID",
  },{
    _id: "3",
    type: "Vendor Name",
  },{
    _id: "4",
    type: "AMC Contractor",
  }];
  devices: Device[];
  vendors: Vendor[];
  contractors: Contractor[];

  selectedSite: Site;
  selectedType: Types;
  selectedDevice: Device;
  selectedVendor: Vendor;
  selectedContractor: Contractor;
  siteSelection:any[]=[];

  //displayedColumns = ['position', 'name', 'weight', 'symbol'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns = ['device_name', 'device_ID', 'vendor', 'start_date', 'end_date', 'contractor', 'file_path', 'reminder_date'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;



  constructor(
    private route: ActivatedRoute,
    private service: MaintenanceModuleService
  ) { }



  onSiteSelect(site: Site): void {
    this.warrantyDetailsList = [];
    this.selectedSite = site;
    this.service.getWarrantyDetailsBySiteId(site._id)
      .subscribe(warrantyDetailsList =>{
        this.warrantyDetailsList = warrantyDetailsList;
        this.dataSource = new MatTableDataSource(warrantyDetailsList);
        this.dataSource.sort = this.sort;
      });

    if(this.selectedType){
      this.callFunctionByType(this.selectedType);
    }
  }
  onTypeSelect(type: Types): void {
    this.selectedType = type;
    this.callFunctionByType(type);
  }
  callFunctionByType(type){
    if(type._id === '1' || type._id === '2'){
      this.getDeviceBySiteId();
    }else if (type._id === '3'){
      this.getVendorsBySiteId();
    }else if(type._id === '4'){
      this.getContractorsBySiteId();
    }
  }
  onDeviceSelect(device: Device): void {
    this.selectedDevice = device;
    this.warrantyDetailsList = [];
    this.service.getWarrantyDetailsBySiteAndDeviceId(this.selectedSite._id, device._id)
      .subscribe(warrantyDetailsList =>{
        this.warrantyDetailsList = warrantyDetailsList;
        this.dataSource = new MatTableDataSource(warrantyDetailsList);
        this.dataSource.sort = this.sort;
      });
  }
  onVendorSelect(vendor: Vendor): void {
    this.selectedVendor = vendor;
    this.warrantyDetailsList = [];
    this.service.getWarrantyDetailsBySiteAndVendorId(this.selectedSite._id, vendor._id)
      .subscribe(warrantyDetailsList =>{
        this.warrantyDetailsList = warrantyDetailsList;
        this.dataSource = new MatTableDataSource(warrantyDetailsList);
        this.dataSource.sort = this.sort;
      });
  }
  onContractorSelect(contractor: Contractor): void {
    this.selectedContractor = contractor;
    this.warrantyDetailsList = [];
    this.service.getWarrantyDetailsBySiteAndContractorId(this.selectedSite._id, contractor._id)
      .subscribe(warrantyDetailsList =>{
        this.warrantyDetailsList = warrantyDetailsList;
        this.dataSource = new MatTableDataSource(warrantyDetailsList);
        this.dataSource.sort = this.sort;
      });
  }



  getSites(): void {
    this.service.getSites()
      .subscribe(sites => this.sites = sites);
  }
  getDeviceBySiteId(): void {
    this.devices = [];
    const site_id = this.selectedSite._id;
    this.service.getDeviceBySiteId(site_id)
      .subscribe(devices => this.devices = devices);
  }
  getVendorsBySiteId(): void {
    this.vendors = [];
    const site_id = this.selectedSite._id;
    this.service.getVendorsBySiteId(site_id)
      .subscribe(vendors => this.vendors = vendors);
  }
  getContractorsBySiteId(): void {
    this.contractors = [];
    const site_id = this.selectedSite._id;
    this.service.getContractorsBySiteId(site_id)
      .subscribe(contractors => this.contractors = contractors);
  }


  ngOnInit() {
    this.getSites();

    this.warrantyDetailsList = [];
    this.service.getWarrantyDetails()
      .subscribe(warrantyDetailsList =>{
        this.warrantyDetailsList = warrantyDetailsList;
        this.dataSource = new MatTableDataSource(warrantyDetailsList);
        this.dataSource.sort = this.sort;
      });
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
  }

}


export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
