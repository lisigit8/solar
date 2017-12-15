import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {Subscription} from "rxjs/Subscription";

import {WarrentyDetails} from "../../models/warrentyDetails";
import {Site} from "../../models/site";
import {Types} from "../../models/types";
import {TYPES} from "../../models/types-data";
import {Device} from "../../models/device";
import {Vendor} from "../../models/vendor";
import {Contractor} from "../../models/contractor";

import {MessageService} from "../../services/MessageService";
import {SiteService} from "../../services/site.service";
import {VendorService} from "../../services/vendor.service";
import {ContractorService} from "../../services/contractor.service";
import {DeviceService} from "../../services/device.service";
import {WarrantyService} from "../../services/warranty.service";
import {SendViaService} from "../../services/send-via.service";
import {SendVia} from "../../models/sendVia";
import {SEND_VIA_DATA} from "../../models/sendVia-data";
import {DeviceName} from "../../models/deviceName";
import {DeviceNameService} from "../../services/device-name.service";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-warranty-details',
  templateUrl: './warranty-details.component.html',
  styleUrls: ['../../app.component.css']
})

export class WarrantyDetailsComponent implements OnInit, OnDestroy {
  warrantyDetailsList: WarrentyDetails[];
  sites: Site[];
  types: Types[] = TYPES;
  devices: Device[];
  deviceNames: DeviceName[];
  vendors: Vendor[];
  contractors: Contractor[];

  selectedSite: any = new Site;
  selectedType: Types;
  selectedDevice: Device;
  selectedDeviceName: DeviceName;
  selectedVendor: Vendor;
  selectedContractor: Contractor;
  selectedWD: WarrentyDetails;
  selectedWDtemp: WarrentyDetails;
  selectedSites: Site[] = [];
  selectedDevices: Device[] = [];
  selectedDeviceNames: DeviceName[] = [];
  selectedVendors: Vendor[] = [];
  selectedContractors: Contractor[] = [];

  subscription: Subscription;

  displayedColumns = ['device_name', 'device_ID', 'vendor_name', 'start_date', 'end_date', 'contractor_name', 'reminder_date'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private messageService: MessageService,
              private siteService: SiteService,
              private vendorService: VendorService,
              private contractorService: ContractorService,
              private deviceService: DeviceService,
              private deviceNameService: DeviceNameService,
              private warrantyService: WarrantyService,
              private sendViaService: SendViaService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        if (message.event == 'dataUpdated') {
          this.ngOnInit();
          if (message.data._id) {
            this.selectedWDtemp = message.data;
            setTimeout(() => {
              $("#row_" + message.data._id).attr("class", "mat-row highlight");
            }, 500);
          }else{
            this.selectedWD = new WarrentyDetails;
          }
        } else if (message.event == 'siteSelected') {
          this.selectedSite = message.data;
          this.onSiteSelect();
        } else if (message.event == 'renewClicked') {
          this.ngOnInit();
          this.selectedSite = new Site;
        }
      }
    });
  }


  ngOnInit() {
    this.getSites();
    this.selectedSites = [];
    this.selectedType = null;
    this.getWarrantyDetails();
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
  }


  getDevices(): void {
    this.deviceService.getDevices()
      .subscribe(devices => this.devices = devices);
  }

  getDeviceNames(): void {
    this.deviceNameService.getAll()
      .subscribe(deviceNames => this.deviceNames = deviceNames);
  }

  getVendors(): void {
    this.vendorService.getVendors()
      .subscribe(vendors => this.vendors = vendors);
  }

  getContractors(): void {
    this.contractorService.getContractors()
      .subscribe(contractors => this.contractors = contractors);
  }

  getSites(): void {
    this.siteService.getSites()
      .subscribe(sites => this.sites = sites);
  }

  /*getDeviceBySiteId(): void {
    this.devices = [];
    if (this.selectedSite) {
      this.deviceService.getDeviceBySiteId(this.selectedSite._id)
        .subscribe(devices => {
          this.devices = devices;
        });
    } else {
      this.selectedSites.forEach(site => {
        this.deviceService.getDeviceBySiteId(site._id)
          .subscribe(devices => devices.forEach(device => {
            this.devices.push(device);
          }));
      });
    }
  }

  getVendorsBySiteId(): void {
    this.vendors = [];
    if (this.selectedSite) {
      this.vendorService.getVendorsBySiteId(this.selectedSite._id)
        .subscribe(vendors => {
          this.vendors = vendors;
        });
    } else {
      this.selectedSites.forEach(site => {
        this.vendorService.getVendorsBySiteId(site._id)
          .subscribe(vendors => vendors.forEach(vendor => {
            this.vendors.push(vendor);
          }));
      });
    }
  }

  getContractorsBySiteId(): void {
    this.contractors = [];
    if (this.selectedSite) {
      this.contractorService.getContractorsBySiteId(this.selectedSite._id)
        .subscribe(contractors => {
          this.contractors = contractors;
        });
    } else {
      this.selectedSites.forEach(site => {
        this.contractorService.getContractorsBySiteId(site._id)
          .subscribe(contractors => contractors.forEach(contractor => {
            if (this.contractors.indexOf(contractor) == -1) {
              this.contractors.push(contractor);
            }
          }));
      });
    }
  }*/

  getWarrantyDetails(): void {
    this.warrantyDetailsList = [];
    this.warrantyService.getWarrantyDetails()
      .subscribe(warrantyDetailsList => {
        this.warrantyDetailsList = warrantyDetailsList;
        this.assignDataSource(warrantyDetailsList);
        if (warrantyDetailsList.length < 1) {
          this.selectedWD = new WarrentyDetails;
        }
      });
  }

  callFunctionByType(type) {
    if (type._id === '1') {
      this.getDeviceNames();
    } else if (type._id === '2') {
      //this.getDeviceBySiteId();
      this.getDevices();
      this.getVendors();
    } else if (type._id === '3') {
      //this.getVendorsBySiteId();
      this.getVendors();
    } else if (type._id === '4') {
      //this.getContractorsBySiteId();
      this.getContractors();
    }
  }


  onSiteSelectAll() {
    if (this.sites.length === this.selectedSites.length) {
      this.selectedSites = [];
    } else {
      this.selectedSites = this.sites;
    }
    this.onSiteSelect();
  }

  onDeviceSelectAll() {
    if (this.devices.length === this.selectedDevices.length) {
      this.selectedDevices = [];
    } else {
      this.selectedDevices = this.devices;
    }
    this.onDeviceSelect();
  }

  onDeviceNameSelectAll() {
    if (this.deviceNames.length === this.selectedDeviceNames.length) {
      this.selectedDeviceNames = [];
    } else {
      this.selectedDeviceNames = this.deviceNames;
    }
    this.onDeviceNameSelect();
  }

  onVendorSelectAll() {
    if (this.vendors.length === this.selectedVendors.length) {
      this.selectedVendors = [];
    } else {
      this.selectedVendors = this.vendors;
    }
    this.onVendorSelect();
  }

  onContractorSelectAll() {
    if (this.contractors.length === this.selectedContractors.length) {
      this.selectedContractors = [];
    } else {
      this.selectedContractors = this.contractors;
    }
    this.onContractorSelect();
  }

  onSiteSelect(): void {
    this.warrantyDetailsList = [];
    this.assignDataSource(this.warrantyDetailsList);
    if (this.selectedSite) {
      this.warrantyService.getWarrantyDetailsBySiteId(this.selectedSite._id)
        .subscribe(warrantyDetailsList => {
          //alert(JSON.stringify(warrantyDetailsList));
          this.warrantyDetailsList = warrantyDetailsList;
          this.assignDataSource(warrantyDetailsList);
        });
    } else {
      this.onMultiSiteSelect();
    }

    if (this.selectedType) {
      this.callFunctionByType(this.selectedType);
    }
  }

  onMultiSiteSelect() {
    this.selectedSites.forEach(site => {
      this.warrantyService.getWarrantyDetailsBySiteId(site._id)
        .subscribe(warrantyDetailsList => warrantyDetailsList.forEach(warrantyDetails => {
          //alert(JSON.stringify(warrantyDetailsList));
          this.warrantyDetailsList.push(warrantyDetails);
          this.assignDataSource(this.warrantyDetailsList);
        }));
    });
  }

  onTypeSelect(type: Types): void {
    this.selectedType = type;
    this.callFunctionByType(type);
  }

  onDeviceSelect(): void {
    this.warrantyDetailsList = [];
    this.assignDataSource(this.warrantyDetailsList);
    if (this.selectedDevice) {
      this.warrantyService.getWarrantyDetailsBySiteAndDeviceId(this.selectedSite._id, this.selectedDevice._id)
        .subscribe(warrantyDetailsList => {
          //(JSON.stringify(warrantyDetailsList));
          this.warrantyDetailsList = warrantyDetailsList;
          this.assignDataSource(warrantyDetailsList);
        });
    } else {
      this.selectedSites.forEach(site => {
        this.selectedDevices.forEach(device => {
          this.warrantyService.getWarrantyDetailsBySiteAndDeviceId(site._id, device._id)
            .subscribe(warrantyDetailsList => warrantyDetailsList.forEach(warrantyDetails => {
              //alert(JSON.stringify(warrantyDetailsList));
              this.warrantyDetailsList.push(warrantyDetails);
              this.assignDataSource(this.warrantyDetailsList);
            }));
        });
      });
    }
  }

  onDeviceNameSelect(): void {
    this.warrantyDetailsList = [];
    this.assignDataSource(this.warrantyDetailsList);
    if (this.selectedDeviceName) {
      this.warrantyService.getWarrantyDetailsBySiteAndDeviceNameId(this.selectedSite._id, this.selectedDeviceName._id)
        .subscribe(warrantyDetailsList => {
          //(JSON.stringify(warrantyDetailsList));
          this.warrantyDetailsList = warrantyDetailsList;
          this.assignDataSource(warrantyDetailsList);
        });
    } else {
      this.selectedSites.forEach(site => {
        this.selectedDeviceNames.forEach(deviceName => {
          this.warrantyService.getWarrantyDetailsBySiteAndDeviceNameId(site._id, deviceName._id)
            .subscribe(warrantyDetailsList => warrantyDetailsList.forEach(warrantyDetails => {
              //alert(JSON.stringify(warrantyDetailsList));
              this.warrantyDetailsList.push(warrantyDetails);
              this.assignDataSource(this.warrantyDetailsList);
            }));
        });
      });
    }
  }

  onVendorSelect(): void {
    this.warrantyDetailsList = [];
    this.assignDataSource(this.warrantyDetailsList);
    if (this.selectedVendor) {
      this.warrantyService.getWarrantyDetailsBySiteAndVendorId(this.selectedSite._id, this.selectedVendor._id)
        .subscribe(warrantyDetailsList => {
          //alert(JSON.stringify(warrantyDetailsList));
          this.warrantyDetailsList = warrantyDetailsList;
          this.assignDataSource(warrantyDetailsList);
        });
    } else {
      this.selectedSites.forEach(site => {
        this.selectedVendors.forEach(vendor => {
          this.warrantyService.getWarrantyDetailsBySiteAndVendorId(site._id, vendor._id)
            .subscribe(warrantyDetailsList => warrantyDetailsList.forEach(warrantyDetails => {
              //alert(JSON.stringify(warrantyDetailsList));
              this.warrantyDetailsList.push(warrantyDetails);
              this.assignDataSource(this.warrantyDetailsList);
            }));
        });
      });
    }
  }

  onContractorSelect(): void {
    this.warrantyDetailsList = [];
    this.assignDataSource(this.warrantyDetailsList);
    if (this.selectedContractor) {
      this.warrantyService.getWarrantyDetailsBySiteAndContractorId(this.selectedSite._id, this.selectedContractor._id)
        .subscribe(warrantyDetailsList => {
          //alert(JSON.stringify(warrantyDetailsList));
          this.warrantyDetailsList = warrantyDetailsList;
          this.assignDataSource(warrantyDetailsList);
        });
    } else {
      this.selectedSites.forEach(site => {
        this.selectedContractors.forEach(contractor => {
          this.warrantyService.getWarrantyDetailsBySiteAndContractorId(site._id, contractor._id)
            .subscribe(warrantyDetailsList => warrantyDetailsList.forEach(warrantyDetails => {
              //alert(JSON.stringify(warrantyDetailsList));
              this.warrantyDetailsList.push(warrantyDetails);
              this.assignDataSource(this.warrantyDetailsList);
            }));
        });
      });
    }
  }

  onWarrantySelect(wd: WarrentyDetails) {
    this.selectedWD = wd;
    this.messageService.sendMessage("rowSelected", wd);
    if (this.selectedWDtemp) {
      $("#row_" + this.selectedWDtemp._id).attr("class", "mat-row");
    }
  }





  assignDataSource(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  ngOnDestroy(): void {
    this.messageService.clearMessage();
  }

}
