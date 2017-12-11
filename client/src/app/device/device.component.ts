import { Component, OnInit } from '@angular/core';

import {MessageService} from "../services/MessageService";
import {DeviceService} from "../services/device.service";

import {Device} from "../models/device";

import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  obj_all: Device[];
  selectedObj: Device;
  obj: Device = new Device;

  constructor(private messageService: MessageService, private service: DeviceService) {
  }

  ngOnInit() {
    this.getAll();
    this.messageService.sendMessage("hideSites", "");
  }

  getAll(): void {
    this.service.getDevices()
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
    this.service.update(this.selectedObj)
      .subscribe(resp => {
        swal(resp.msg);
        this.clearAll();
      });
  }

  remove(id) {
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
