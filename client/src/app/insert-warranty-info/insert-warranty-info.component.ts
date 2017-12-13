import {Component, OnInit} from '@angular/core';
import {WarrentyDetails} from "../models/warrentyDetails";
import {WarrantyService} from "../services/warranty.service";
import {DeviceService} from "../services/device.service";
import {Contractor} from "../models/contractor";
import {Customer} from "../models/customer";
import {Device} from "../models/device";
import {DocumentsService} from "../services/documents.service";
import {ContractorService} from "../services/contractor.service";
import {VendorService} from "../services/vendor.service";
import {SendVia} from "../models/sendVia";
import {DeviceName} from "../models/deviceName";
import {Site} from "../models/site";
import {DeviceNameService} from "../services/device-name.service";
import {Warranty_SendVia} from "../models/warranty-sendvia";
import {Vendor} from "../models/vendor";
import {CustomerService} from "../services/customer.service";
import {SiteService} from "../services/site.service";
import {SendViaService} from "../services/send-via.service";
import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import {MessageService} from "../services/MessageService";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-insert-warranty-info',
  templateUrl: './insert-warranty-info.component.html',
  styleUrls: ['../app.component.css']
})
export class InsertWarrantyInfoComponent implements OnInit {
  private selectUndefinedOptionValue: any;

  wd: WarrentyDetails;
  data = new FormData();

  warranty_sendVia: Warranty_SendVia = new Warranty_SendVia;
  sendViaAll: SendVia[];
  sites: Site[];
  devices: Device[];
  devicesByDeviceName: Device[];
  deviceNames: DeviceName[];
  vendors: Vendor[];
  contractors: Contractor[];
  customers: Customer[];

  constructor(private messageService: MessageService,
              private siteService: SiteService,
              private vendorService: VendorService,
              private contractorService: ContractorService,
              private customerService: CustomerService,
              private deviceService: DeviceService,
              private deviceNameService: DeviceNameService,
              private documentsService: DocumentsService,
              private warrantyService: WarrantyService,
              private sendViaService: SendViaService) {
  }

  ngOnInit() {
    this.wd = new WarrentyDetails;
    this.getSites();
    this.getDeviceNames();
    this.getVendors();
    this.getContractors();
    this.getCustomers();
    this.getSendVia();
    this.clearFileField();
  }

  clearSendViaFields() {
    this.sendViaAll.forEach(sendVia => {
      sendVia.isSelected = false;
    });
  }

  clearFileField() {
    $("#file_names").html('');
    $("#files").val('');
  }

  getSendVia() {
    this.sendViaService.getSendVia()
      .subscribe(sendViaAll => {
        this.sendViaAll = sendViaAll;
        this.clearSendViaFields();
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

  getDevicesByDeviceNameId(deviceName_id: string): void {
    this.deviceService.getDevicesByDeviceNameId(deviceName_id)
      .subscribe(devices => this.devicesByDeviceName = devices);
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

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }

  insertDocs(data: FormData): void {
    //alert(data.getAll('files').length);
    if(data.getAll('files').length > 0){
      this.documentsService.insertDocs(data).subscribe(resp => {
        resp.forEach((document, index, array) => {
          document.warrantyInfo = this.wd;
          setTimeout(() => {
            this.documentsService.updateDocument(document).subscribe(updateResp => {
              //alert(updateResp.msg);
              if (resp.length == array.length) {
                this.ngOnInit();
                this.messageService.sendMessage("dataUpdated", new WarrentyDetails);
              }else{
                alert("not same")
              }
            });
          }, 100);
        });
      });
    }else{
      this.ngOnInit();
      this.messageService.sendMessage("dataUpdated", new WarrentyDetails);
    }
  }

  insertWarrantyInfoSendVia(): void {
    this.sendViaAll.forEach(sendVia => {
      if (sendVia.isSelected) {
        this.warranty_sendVia.warrantyInfo = this.wd;
        this.warranty_sendVia.sendVia = sendVia;
        this.warrantyService.insertWarrantyInfoSendVia(this.warranty_sendVia).subscribe(resp => {
          sendVia.isSelected = false;
          this.insertDocs(this.data);
        });
      }
    });
  }

  insertWarrantyInfo() {
    this.warrantyService.insertWarrantyInfo(this.wd)
      .subscribe(resp => {
        if (resp.errors) {
          swal("Please try again!", "", "error");
        } else {
          swal(resp.msg, "", "success");
          this.wd = resp.obj;
          this.insertWarrantyInfoSendVia();
        }
      });
  }

  onSelectDeviceName() {
    this.getDevicesByDeviceNameId(this.wd.deviceName._id);
  }

  onDocChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.data.append('files', event.target.files[i]);
      $("#file_names").append('<li>' + event.target.files[i].name + '</li>');
    }
  }

}