import {Component, OnInit} from '@angular/core';

import * as XLSX from 'xlsx';
import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';

import {saveAs} from 'file-saver';
import {WarrentyDetails} from "../models/warrentyDetails";
import {SiteService} from "../services/site.service";
import {DeviceService} from "../services/device.service";
import {VendorService} from "../services/vendor.service";
import {ContractorService} from "../services/contractor.service";
import {CustomerService} from "../services/customer.service";
import {DeviceNameService} from "../services/device-name.service";
import {WarrantyService} from "../services/warranty.service";
import {SendViaService} from "../services/send-via.service";
import {Warranty_SendVia} from "../models/warranty-sendvia";

type AOA = Array<Array<any>>;

function s2ab(s: string): ArrayBuffer {
  const buf: ArrayBuffer = new ArrayBuffer(s.length);
  const view: Uint8Array = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

@Component({
  selector: 'app-batch-upload',
  templateUrl: './batch-upload.component.html',
  styleUrls: ['../app.component.css']
})
export class BatchUploadComponent implements OnInit {
  data: AOA/* = [ [1, 2], [3, 4] ]*/;
  wopts: XLSX.WritingOptions = {bookType: 'xlsx', type: 'binary'};
  fileName: string = 'SheetJS.xlsx';

  wd: WarrentyDetails = new WarrentyDetails;
  warranty_sendVia: Warranty_SendVia = new Warranty_SendVia;

  constructor(private siteService: SiteService,
              private deviceService: DeviceService,
              private deviceNameService: DeviceNameService,
              private vendorService: VendorService,
              private contractorService: ContractorService,
              private customerService: CustomerService,
              private warrantyService: WarrantyService,
              private sendViaService: SendViaService) {
  }

  ngOnInit() {
  }

  onFileChange(evt: any) {
    this.readAndStoreData(evt, () => {
      this.data.forEach((row, index, array) => {
        alert(index + ", " + row);
        if (row.length < 14) {
          swal('All fields are mandatory!', '', 'error');
        } else if (index > 0) {
          this.siteService.getByName(row[0]).subscribe(site => {
            if (site == null) {
              swal("No such site found for row " + index + "!", "", "error");
            } else if (site.errors) {
              swal("Something is wrong to fetch site for row " + index + "!", "", "error");
            } else {
              this.wd.site = site;
              this.deviceService.getByID(row[2]).subscribe(device => {
                if (device == null) {
                  swal("No such device found for row " + index + "!", "", "error");
                } else if (device.errors) {
                  swal("Something is wrong to fetch device for row " + index + "!", "", "error");
                } else {
                  this.deviceNameService.getById(device.deviceName + "").subscribe(deviceName => {
                    if (deviceName == null) {
                      swal("No such device name found for row " + index + "!", "", "error");
                    } else if (deviceName.errors) {
                      swal("Something is wrong to fetch device name for row " + index + "!", "", "error");
                    } else {
                      if (deviceName.name == row[1]) {
                        this.wd.device = device;
                      }
                      this.vendorService.getByName(row[3]).subscribe(vendor => {
                        if (vendor == null) {
                          swal("No such vendor found for row " + index + "!", "", "error");
                        } else if (vendor.errors) {
                          swal("Something is wrong to fetch vendor for row " + index + "!", "", "error");
                        } else {
                          this.wd.vendor = vendor;
                          this.wd.start_date = row[4];
                          this.wd.end_date = row[5];
                          this.contractorService.getByName(row[6]).subscribe(contractor => {
                            if (contractor == null) {
                              swal("No such contractor found for row " + index + "!", "", "error");
                            } else if (contractor.errors) {
                              swal("Something is wrong to fetch contractor for row " + index + "!", "", "error");
                            } else {
                              this.wd.contractor = contractor;
                              this.wd.cost = row[7];
                              this.wd.auto_renewal = row[8];
                              this.wd.reminder_date = row[9];
                              this.customerService.getByNameAndMobile(row[10], row[11]).subscribe(customer => {
                                if (customer == null) {
                                  swal("No such customer found for row " + index + "!", "", "error");
                                } else if (customer.errors) {
                                  swal("Something is wrong to fetch customer for row " + index + "!", "", "error");
                                } else {
                                  this.wd.customer = customer;
                                  this.warrantyService.insertWarrantyInfo(this.wd)
                                    .subscribe(resp => {
                                      if (resp.errors) {
                                        swal("Something is wrong to insert warranty information for row " + index + "!", "", "error");
                                      } else {
                                        swal(resp.msg, "", "success");
                                        this.sendViaService.getSendVia().subscribe(sendViaAll => {
                                          sendViaAll.forEach(sendVia => {
                                            this.warranty_sendVia.warrantyInfo = resp.obj;
                                            this.warranty_sendVia.sendVia = sendVia;
                                            if ((sendVia.send_via === 'SMS' && row[12] == 'TRUE') ||
                                              (sendVia.send_via === 'email' && row[13] == 'TRUE')) {
                                              this.warrantyService.insertWarrantyInfoSendVia(this.warranty_sendVia).subscribe(resp => {
                                                if (resp.errors) {
                                                  swal("Something is wrong to insert send via of warranty information for row " + index + "!", "", "error");
                                                }
                                              });
                                            }
                                          });
                                        });
                                      }
                                    });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  }

  readAndStoreData(evt: any, callback: Function) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
    };
    reader.readAsBinaryString(target.files[0]);


    setTimeout(function () {
      callback();
    }, 1000);
  }

  export(): void {
    /*/!* generate worksheet *!/
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /!* generate workbook and add the worksheet *!/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /!* save to file *!/
    const wbout: string = XLSX.write(wb, this.wopts);
    saveAs(new Blob([s2ab(wbout)]), this.fileName);*/
  }

}
