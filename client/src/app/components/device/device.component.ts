import {Component, OnInit} from '@angular/core';

import {MessageService} from "../../services/MessageService";
import {DeviceService} from "../../services/device.service";

import {Device} from "../../models/device";

import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import {DeviceName} from "../../models/deviceName";
import {DeviceNameService} from "../../services/device-name.service";
import {deleteSwalOpts} from "../../services/common";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['../../app.component.css']
})
export class DeviceComponent implements OnInit {
  private selectUndefinedOptionValue: any;

  obj_all: Device[];
  selectedObj: Device;
  obj: Device = new Device;

  deviceNames: DeviceName[];

  constructor(private messageService: MessageService, private service: DeviceService, private serviceDN: DeviceNameService) {
  }

  ngOnInit() {
    this.getAll();
    this.getAllDeviceNames();
    this.messageService.sendMessage("hideSites", "");
  }

  getAll(): void {
    this.service.getDevices()
      .subscribe(items => {
        this.obj_all = items;
      });
  }
  getAllDeviceNames(): void {
    this.serviceDN.getAll()
      .subscribe(items => this.deviceNames = items);
  }

  onSelect(obj: any): void {
    this.selectedObj = obj;
    if(obj.deviceName._id){
      this.serviceDN.getById(obj.deviceName._id)
        .subscribe(item => this.selectedObj.deviceName = item);
    }else{
      this.serviceDN.getById(obj.deviceName)
        .subscribe(item => this.selectedObj.deviceName = item);
    }
  }

  insert() {
    this.service.insert(this.obj)
      .subscribe(resp => {
        swal(resp.msg);
        this.clearAll();
      });
  }

  update() {
    this.service.update(this.selectedObj)
      .subscribe(resp => {
        swal(resp.msg);
        this.clearAll();
      });
  }

  remove(id) {
    swal(deleteSwalOpts).then((result) => {
      if (result.value) {
        this.service.remove(id)
          .subscribe(resp => {
            swal("Successful");
            this.clearAll();
          });
      }
    });
  }

  clearAll() {
    this.getAll();
    this.obj = new Device;
    this.selectedObj = new Device;
  }

}
