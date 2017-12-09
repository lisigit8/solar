import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {WarrentyDetails} from "../models/warrenty-details";
import {Site} from "../models/site";
import {Device} from "../models/device";
import {Vendor} from "../models/vendor";
import {Contractor} from "../models/contractor";
import {Customer} from "../models/customer";

import {MessageService} from "../services/MessageService";
import {MaintenanceModuleService} from "../services/maintenance-module.service";
import {SiteService} from "../services/site.service";
import {apiUrl} from "../services/common";
import {VendorService} from "../services/vendor.service";
import {ContractorService} from "../services/contractor.service";
import {CustomerService} from "../services/customer.service";
import {DeviceService} from "../services/device.service";
import {DocumentsService} from "../services/documents.service";
import {WarrantyService} from "../services/warranty.service";

@Component({
  selector: 'app-warranty-information',
  templateUrl: './warranty-information.component.html',
  styleUrls: ['../app.component.css']
})
export class WarrantyInformationComponent implements OnInit,OnDestroy {
  @Input()
    id: string;

  sites: Site[];
  subscription: Subscription;
  data = new FormData();
  toInsert: boolean;
  apiUrl: string = apiUrl;

  /*@Output()
  evt: EventEmitter<string> = new EventEmitter();*/

  devices: Device[];
  vendors: Vendor[];
  contractors: Contractor[];
  customers: Customer[];

  wd: WarrentyDetails;
  //id1: string = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute,

              private service: MaintenanceModuleService,
              private messageService: MessageService,
              private siteService: SiteService,
              private vendorService: VendorService,
              private contractorService: ContractorService,
              private customerService: CustomerService,
              private deviceService: DeviceService,
              private documentsService: DocumentsService,
              private warrantyService: WarrantyService
  ) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if(message.event=='rowSelected'){
        this.id = message.data._id;
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.getSites();
    this.getDevices();
    this.getVendors();
    this.getContractors();
    this.getCustomers();
    this.getWarrantyDetailsByWarrantyId(this.id);
  }

  /*clickme() {
    this.evt.emit('a');
  }*/

  getSites(): void {
    this.siteService.getSites()
      .subscribe(sites => this.sites = sites);
  }
  getDevices(): void {
    this.deviceService.getDevices()
      .subscribe(devices => this.devices = devices);
  }
  getVendors(): void {
    this.vendorService.getVendors()
      .subscribe(vendors => this.vendors = vendors);
  }
  getContractors(): void {
    this.contractorService.getContractors()
      .subscribe(contractors => this.contractors = contractors);
  }
  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }
  getWarrantyDetailsByWarrantyId(id: string): void {
    this.warrantyService.getWarrantyDetailsByWarrantyId(id)
      .subscribe(wd =>{
        this.wd = wd;
        this.toInsert = false;
        this.getDocumentsByWarrantyId(this.wd._id);
      });
  }
  getDocumentsByWarrantyId(warranty_id: string): void {
    this.documentsService.getDocumentsByWarrantyId(warranty_id)
      .subscribe(documents =>{
        this.wd.documents = documents;
      });
  }

  updateWarrantyInfo() {
     this.warrantyService.updateWarrantyInfo(this.wd)
       .subscribe(resp => {
         alert(resp.msg);
         this.insertDocs(this.data);
         this.messageService.sendMessage("dataUpdated","");
       });
  }
  updateOrInsertWarrantyInfo(){
    if(this.toInsert){
      this.insertWarrantyInfo();
    }else{
      this.updateWarrantyInfo();
    }
  }
  remove(){
    this.warrantyService.removeWarrantyInfo(this.wd._id).subscribe(resp=>{
      this.onClickOnNew();
      //alert(resp.msg);
      alert(this.messageService.message);
    });
  }

  onDocChange(event) {
    this.data = new FormData();
    if(event.target.files.length > 0) {
     /* event.target.files.forEach(item=>{*/
        this.data.append('files',  event.target.files[0]);
      /*});*/

    }
  }
  insertDocs(data:any):void{
    this.documentsService.insertDocs(data).subscribe(resp=>{
      resp.map(document => {
          document.warrantyInfo=this.wd;
          this.documentsService.updateDocument(document).subscribe(resp=>{
            //alert(resp.msg);
            if(!this.toInsert) {
              this.ngOnInit();
            }else{
              this.onClickOnNew();
            }
            this.messageService.sendMessage("dataUpdated","");
          });
      });
    });
  }
  onClickOnNew(){
    this.wd = new WarrentyDetails;
    this.toInsert = true;

    this.messageService.sendMessage("dataUpdated","");
  }
  insertWarrantyInfo() {
    this.warrantyService.insertWarrantyInfo(this.wd)
      .subscribe(resp => {
        alert(resp.msg);
        this.wd = resp.obj;
        this.insertDocs(this.data);
        this.messageService.sendMessage("dataUpdated","");
      });
  }
  removeDocument(id: string){
    this.documentsService.removeDocument(id).subscribe(resp=>{
      this.messageService.sendMessage("dataUpdated","");
      if(!this.toInsert) {
        this.ngOnInit();
      }
      alert("Deleted successfully!");
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
