import { Component, OnInit } from '@angular/core';

import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';

import {CustomerService} from "../services/customer.service";
import {MessageService} from "../services/MessageService";

import {Customer} from "../models/customer";
import {deleteSwalOpts} from "../services/common";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['../app.component.css']
})
export class CustomerComponent implements OnInit {

  obj_all: Customer[];
  selectedObj: Customer;
  obj: Customer = new Customer;

  constructor(private messageService: MessageService, private service: CustomerService) {
  }

  ngOnInit() {
    this.getAll();
    this.messageService.sendMessage("hideSites", "");
  }

  getAll(): void {
    this.service.getCustomers()
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
    this.obj = new Customer;
    this.selectedObj = new Customer;
  }

}
