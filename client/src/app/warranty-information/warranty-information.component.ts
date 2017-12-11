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
import {SendViaService} from "../services/send-via.service";
import {SendVia} from "../models/send-via";
import {Warranty_SendVia} from "../models/warranty-sendvia";

import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-warranty-information',
  templateUrl: './warranty-information.component.html',
  styleUrls: ['../app.component.css']
})
export class WarrantyInformationComponent implements OnInit, OnDestroy {
  @Input()
  id: string;
  //id1: string = this.route.snapshot.paramMap.get('id');

  /*@Output()
  evt: EventEmitter<string> = new EventEmitter();*/

  subscription: Subscription;
  data = new FormData();
  toInsert: boolean;
  apiUrl: string = apiUrl;

  warranty_sendVia: Warranty_SendVia = new Warranty_SendVia;
  sendViaAll: SendVia[];
  sites: Site[];
  devices: Device[];
  vendors: Vendor[];
  contractors: Contractor[];
  customers: Customer[];
  wd: WarrentyDetails;


  constructor(private route: ActivatedRoute,
              private service: MaintenanceModuleService,
              private messageService: MessageService,
              private siteService: SiteService,
              private vendorService: VendorService,
              private contractorService: ContractorService,
              private customerService: CustomerService,
              private deviceService: DeviceService,
              private documentsService: DocumentsService,
              private warrantyService: WarrantyService,
              private sendViaService: SendViaService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message.event == 'rowSelected') {
        this.id = message.data._id;
        this.data = new FormData();
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
    if (this.id != ""){
      this.getSendVia();
      this.toInsert = false;
      this.getWarrantyDetailsByWarrantyId(this.id);
    }else{
      this.wd = new WarrentyDetails;
      this.toInsert = true;
      this.sendViaService.getSendVia()
        .subscribe(sendViaAll => {
          this.sendViaAll = sendViaAll;
          this.sendViaAll.forEach(sendVia => {
            sendVia.isSelected = false;
          });
        });
    }
    this.clearFileField();
  }


  /*clickme() {
    this.evt.emit('a');
  }*/


  getSendVia() {
    this.sendViaService.getSendVia()
      .subscribe(sendViaAll => {
        this.sendViaAll = sendViaAll;
      });
  }

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
      .subscribe(wd => {
        this.wd = wd;
        this.toInsert = false;
        this.getDocumentsByWarrantyId(this.wd._id);

        this.sendViaAll.forEach(sendVia => {
          this.warrantyService.getWarrantyInfoSendViaByWarrantyId(this.wd._id)
            .subscribe(warranty_sendVia_all => {
              warranty_sendVia_all.forEach(warranty_sendVia => {
                if (warranty_sendVia.sendVia + "" === sendVia._id + "") {
                  sendVia.isSelected = true;
                }
              })
            });
        });
      });
  }

  getDocumentsByWarrantyId(warranty_id: string): void {
    this.documentsService.getDocumentsByWarrantyId(warranty_id)
      .subscribe(documents => {
        this.wd.documents = documents;
      });
  }


  onSelectSendVia() {

  }

  onDocChange(event) {
    for (var i=0; i<event.target.files.length; i++){
      this.data.append('files', event.target.files[i]);
      $("#file_names").append('<li>'+event.target.files[i].name+'</li>');
    }
  }

  onClickOnNew() {
    this.wd = new WarrentyDetails;
    this.toInsert = true;
    this.data = new FormData();
    this.clearSendViaFields();

    this.messageService.sendMessage("dataUpdated", this.wd);
  }

  clearFileField(){
    $("#file_names").html('');
    $("#files").val('');
  }
  clearSendViaFields(){
    this.sendViaAll.forEach(sendVia => {
      sendVia.isSelected = false;
    });
  }


  insertDocs(data: any): void {
    this.documentsService.insertDocs(data).subscribe(resp => {
      resp.map(document => {
        document.warrantyInfo = this.wd;
        this.documentsService.updateDocument(document).subscribe(resp => {
          //alert(resp.msg);
          if (!this.toInsert) {
            this.ngOnInit();
          } else {
            this.onClickOnNew();
          }
          this.messageService.sendMessage("dataUpdated", this.wd);
        });
      });


      this.clearFileField();
    });
  }

  insertWarrantyInfoSendVia(): void {
    this.sendViaAll.forEach(sendVia => {
      if (sendVia.isSelected) {
        this.warranty_sendVia.warrantyInfo = this.wd;
        this.warranty_sendVia.sendVia = sendVia;
        this.warrantyService.insertWarrantyInfoSendVia(this.warranty_sendVia).subscribe(resp => {
          console.log(resp.msg);
          sendVia.isSelected = false;
        });
      }
    });
  }

  insertWarrantyInfo() {
    this.warrantyService.insertWarrantyInfo(this.wd)
      .subscribe(resp => {
        //alert(resp.msg);
        swal(resp.msg, "", "success");
        this.wd = resp.obj;
        this.insertDocs(this.data);
        this.insertWarrantyInfoSendVia();
        this.messageService.sendMessage("dataUpdated", this.wd);
      });
  }


  updateWarrantyInfo() {
    this.warrantyService.updateWarrantyInfo(this.wd)
      .subscribe(resp => {
        //alert(resp.msg);
        swal(resp.msg, "", "success");
        this.insertDocs(this.data);
        this.insertWarrantyInfoSendVia();
        this.messageService.sendMessage("dataUpdated", this.wd);
      });
  }

  updateOrInsertWarrantyInfo() {
    if (this.toInsert) {
      this.insertWarrantyInfo();
    } else {
      this.updateWarrantyInfo();
    }
  }


  remove() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.warrantyService.removeWarrantyInfo(this.wd._id).subscribe(resp => {
          this.onClickOnNew();
          //alert(resp.msg);
          //alert(this.messageService.message);
          swal(this.messageService.message, "", "success");
        });
      }
    });
  }

  removeDocument(id: string) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.documentsService.removeDocument(id).subscribe(resp => {
          this.messageService.sendMessage("dataUpdated", this.wd);
          if (!this.toInsert) {
            this.ngOnInit();
            //alert("Deleted successfully!");
            swal("Deleted successfully!", "", "success");
          }
        });
      }
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
