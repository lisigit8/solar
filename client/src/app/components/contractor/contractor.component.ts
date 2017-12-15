import {Component, OnInit} from '@angular/core';

import {MessageService} from "../../services/MessageService";
import {ContractorService} from "../../services/contractor.service";

import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';

import {Contractor} from "../../models/contractor";
import {deleteSwalOpts} from "../../services/common";

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['../../app.component.css']
})
export class ContractorComponent implements OnInit {

  obj_all: Contractor[];
  selectedObj: Contractor;
  obj: Contractor = new Contractor;

  constructor(private messageService: MessageService, private service: ContractorService) {
  }

  ngOnInit() {
    this.getAll();
    this.messageService.sendMessage("hideSites", "");
  }

  getAll(): void {
    this.service.getContractors()
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
    this.obj = new Contractor;
    this.selectedObj = new Contractor;
  }

}
