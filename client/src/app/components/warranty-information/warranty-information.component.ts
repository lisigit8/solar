import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Router} from '@angular/router';

import {WarrentyDetails} from "../../models/warrentyDetails";
import {Site} from "../../models/site";
import {Device} from "../../models/device";
import {Vendor} from "../../models/vendor";
import {Contractor} from "../../models/contractor";
import {Customer} from "../../models/customer";
import {DeviceName} from "../../models/deviceName";
import {SendVia} from "../../models/sendVia";
import {Warranty_SendVia} from "../../models/warranty-sendvia";

import {MessageService} from "../../services/MessageService";
import {SiteService} from "../../services/site.service";
import {apiUrl, deleteSwalOpts} from "../../services/common";
import {VendorService} from "../../services/vendor.service";
import {ContractorService} from "../../services/contractor.service";
import {CustomerService} from "../../services/customer.service";
import {DeviceService} from "../../services/device.service";
import {DocumentsService} from "../../services/documents.service";
import {WarrantyService} from "../../services/warranty.service";
import {SendViaService} from "../../services/send-via.service";
import {DeviceNameService} from "../../services/device-name.service";

import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import {AuthenticationService} from "../../services/authentication.service";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-warranty-information',
  templateUrl: './warranty-information.component.html',
  styleUrls: ['../../app.component.css']
})
export class WarrantyInformationComponent implements OnInit, OnDestroy {
  private selectUndefinedOptionValue: any;
  @Input()
  id: string;
  //id1: string = this.route.snapshot.paramMap.get('id');

  /*@Output()
  evt: EventEmitter<string> = new EventEmitter();*/

  subscription: Subscription;
  data = new FormData();
  tempData = new FormData();
  fileNames: any[] = [];
  apiUrl: string = apiUrl;

  warranty_sendVia: Warranty_SendVia = new Warranty_SendVia;
  sendViaAll: SendVia[];
  sites: Site[];
  devices: Device[];
  devicesByDeviceName: Device[];
  deviceNames: DeviceName[];
  vendors: Vendor[];
  contractors: Contractor[];
  customers: Customer[];
  wd: WarrentyDetails;


  constructor(private route: ActivatedRoute,
              private messageService: MessageService,
              private siteService: SiteService,
              private vendorService: VendorService,
              private contractorService: ContractorService,
              private customerService: CustomerService,
              private deviceService: DeviceService,
              private deviceNameService: DeviceNameService,
              private documentsService: DocumentsService,
              private warrantyService: WarrantyService,
              private sendViaService: SendViaService,
              private authService: AuthenticationService,
              private router: Router) {
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
    this.getDeviceNames();
    this.getVendors();
    this.getContractors();
    this.getCustomers();
    this.getSendVia();
    this.clearFileField();
    this.getWarrantyDetailsByWarrantyId(this.id);

    this.checkLogin();
  }

  checkLogin() {
    this.authService.checkLogin()
      .subscribe(resp => {
        if (resp == null) {
          alert('Logging out!!!');
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      });
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

  getWarrantyDetailsByWarrantyId(id: string): void {
    this.warrantyService.getWarrantyDetailsByWarrantyId(id)
      .subscribe(wd => {
        this.wd = wd;
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

        this.getDevicesByDeviceNameId(wd.deviceName._id);
      });
  }

  getDocumentsByWarrantyId(warranty_id: string): void {
    this.documentsService.getDocumentsByWarrantyId(warranty_id)
      .subscribe(documents => {
        this.wd.documents = documents;
      });
  }


  onSelectDeviceName() {
    this.getDevicesByDeviceNameId(this.wd.deviceName._id);
  }

  addFileNames() {
    this.fileNames = [];
    this.data.getAll('files').forEach((file, index, array) => {
      var fileName = new Object();
      fileName['name'] = file['name'];
      fileName['index'] = index;
      this.fileNames.push(fileName);
    });
  }

  deleteFile(ind: any) {
    this.tempData = new FormData();
    this.data.getAll('files').forEach((file, index, array) => {
      if (Number(ind) !== Number(index)) {
        this.tempData.append('files', file);
      }
      if (index + 1 === array.length) {
        this.data = this.tempData;
        this.addFileNames();
      }
    });
  }

  onDocChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.data.append('files', event.target.files[i]);
      //$("#file_names").append('<li>' + event.target.files[i].name + '</li>');

      if (i + 1 === event.target.files.length) {
        this.addFileNames();
      }
    }
  }

  onClickOnNew() {
    this.messageService.sendMessage("dataUpdated", new WarrentyDetails);
  }

  clearFileField() {
    $("#file_names").html('');
    $("#files").val('');
  }

  insertDocs(data: any): void {
    if (data.getAll('files').length > 0) {
      this.documentsService.insertDocs(data).subscribe(resp => {
        resp.forEach((document, index, array) => {
          document.warrantyInfo = this.wd;
          setTimeout(() => {
            this.documentsService.updateDocument(document).subscribe(updateResp => {
              //alert(updateResp.msg);
              if (index + 1 == array.length) {
                this.id = this.wd._id;
                this.ngOnInit();
                this.messageService.sendMessage("dataUpdated", this.wd);
              }
            });
          }, 100);
        });
      });
    } else {
      this.id = this.wd._id;
      this.ngOnInit();
      this.messageService.sendMessage("dataUpdated", this.wd);
    }
  }

  insertWarrantyInfoSendVia(): void {
    this.sendViaAll.forEach((sendVia, index, array) => {
      if (sendVia.isSelected) {
        this.warranty_sendVia.warrantyInfo = this.wd;
        this.warranty_sendVia.sendVia = sendVia;
        this.warrantyService.insertWarrantyInfoSendVia(this.warranty_sendVia).subscribe(resp => {
          sendVia.isSelected = false;
        });
      }
      if (index + 1 === array.length) {
        this.insertDocs(this.data);
      }
    });
  }


  updateWarrantyInfo() {
    this.warrantyService.updateWarrantyInfo(this.wd)
      .subscribe(resp => {
        //alert(resp.msg);
        swal(resp.msg, "", "success");
        this.insertWarrantyInfoSendVia();
      });
  }


  remove() {
    swal(deleteSwalOpts).then((result) => {
      if (result.value) {
        this.warrantyService.removeWarrantyInfo(this.wd._id).subscribe(resp => {
          this.onClickOnNew();
          //alert(resp.msg);
          swal(this.messageService.message, "", "success");
        });
      }
    });
  }

  removeDocument(id: string) {
    swal(deleteSwalOpts).then((result) => {
      if (result.value) {
        this.documentsService.removeDocument(id).subscribe(resp => {
          this.messageService.sendMessage("dataUpdated", this.wd);
          this.id = this.wd._id;
          this.ngOnInit();
          swal("Deleted successfully!", "", "success");
        });
      }
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
