import { Component, OnInit } from '@angular/core';

import {MessageService} from "../services/MessageService";
import {VendorService} from "../services/vendor.service";

import {Vendor} from "../models/vendor";

import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  obj_all: Vendor[];
  selectedObj: Vendor;
  obj: Vendor = new Vendor;

  constructor(private messageService: MessageService, private service: VendorService) {
  }

  ngOnInit() {
    this.getAll();
    this.messageService.sendMessage("hideSites", "");
  }

  getAll(): void {
    this.service.getVendors()
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
    this.obj = new Vendor;
    this.selectedObj = new Vendor;
  }

}
