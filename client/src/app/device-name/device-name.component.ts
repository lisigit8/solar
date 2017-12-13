import { Component, OnInit } from '@angular/core';

import {MessageService} from "../services/MessageService";
import {DeviceNameService} from "../services/device-name.service";

import {DeviceName} from "../models/deviceName";

import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import {deleteSwalOpts} from "../services/common";

@Component({
  selector: 'app-device-name',
  templateUrl: './device-name.component.html',
  styleUrls: ['../app.component.css']
})
export class DeviceNameComponent implements OnInit {

  obj_all: DeviceName[];
  selectedObj: DeviceName;
  obj: DeviceName = new DeviceName;

  constructor(private messageService: MessageService, private service: DeviceNameService) {
  }

  ngOnInit() {
    this.getAll();
    this.messageService.sendMessage("hideSites", "");
  }

  getAll(): void {
    this.service.getAll()
      .subscribe(items => this.obj_all = items);
  }

  onSelect(obj: any): void {
    this.selectedObj = obj;
  }

  insert() {
    this.service.insert(this.obj)
      .subscribe(resp => {
        swal(resp.msg);
        this.clearAll();
      });
  }

  update() {
    alert(this.selectedObj);
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
    this.obj = new DeviceName;
    this.selectedObj = new DeviceName;
  }

}
