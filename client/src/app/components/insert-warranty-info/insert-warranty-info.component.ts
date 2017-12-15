import {Component, OnInit} from '@angular/core';
import {WarrentyDetails} from "../../models/warrentyDetails";
import {WarrantyService} from "../../services/warranty.service";
import {DeviceService} from "../../services/device.service";
import {Contractor} from "../../models/contractor";
import {Customer} from "../../models/customer";
import {Device} from "../../models/device";
import {DocumentsService} from "../../services/documents.service";
import {ContractorService} from "../../services/contractor.service";
import {VendorService} from "../../services/vendor.service";
import {SendVia} from "../../models/sendVia";
import {DeviceName} from "../../models/deviceName";
import {Site} from "../../models/site";
import {DeviceNameService} from "../../services/device-name.service";
import {Warranty_SendVia} from "../../models/warranty-sendvia";
import {Vendor} from "../../models/vendor";
import {CustomerService} from "../../services/customer.service";
import {SiteService} from "../../services/site.service";
import {SendViaService} from "../../services/send-via.service";
import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import {MessageService} from "../../services/MessageService";
import {pathName} from "../../services/common";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-insert-warranty-info',
  templateUrl: './insert-warranty-info.component.html',
  styleUrls: ['../../app.component.css']
})
export class InsertWarrantyInfoComponent implements OnInit {
  private selectUndefinedOptionValue: any;

  wd: WarrentyDetails;
  data = new FormData();
  tempData = new FormData();
  fileNames: any[] = [];

  pathName: string = pathName;

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
              private sendViaService: SendViaService,
              private authService: AuthenticationService,
              private router: Router) {
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
    this.data = new FormData();

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
    if (data.getAll('files').length > 0) {
      this.documentsService.insertDocs(data).subscribe(resp => {
        resp.forEach((document, index, array) => {
          document.warrantyInfo = this.wd;
          setTimeout(() => {
            this.documentsService.updateDocument(document).subscribe(updateResp => {
              //alert(updateResp.msg);
              if (index + 1 === array.length) {
                this.ngOnInit();
                this.messageService.sendMessage("dataUpdated", new WarrentyDetails);
              }
            });
          }, 100);
        });
      });
    } else {
      this.ngOnInit();
      this.messageService.sendMessage("dataUpdated", new WarrentyDetails);
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
        /*alert(this.data.getAll('files').length);*/
        this.insertDocs(this.data);
      }
    });
  }

  insertWarrantyInfo() {
    this.warrantyService.insertWarrantyInfo(this.wd)
      .subscribe(resp => {
        if (resp.errors) {
          swal("All fields are mandatory!", "", "error");
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

  /*testDelete() {
    console.log(this.data.getAll('files').length);
    console.log(this.data.getAll('files'));

    this.data.getAll('files').forEach(file => {
      console.log(file['name']);
      console.log(file.valueOf());
    });

    console.log(this.data.get('files'));
    console.log(this.data.getAll('files')[0]);
  }*/

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
      //console.log(event.target.files[i]);
      this.data.append('files', event.target.files[i]);

      if (i + 1 === event.target.files.length) {
        this.addFileNames();
      }
    }
  }

  onClickManual() {
    $('#batchORmanual').hide();
    $('#batchUpload').hide();
    $('#manual').show();
  }

  onClickBatch() {
    $('#batchORmanual').hide();
    $('#manual').hide();
    $('#batchUpload').show();
  }

  onClickOnNew() {
    $('#batchORmanual').show();
    $('#batchUpload').hide();
    $('#manual').hide();
  }

}
