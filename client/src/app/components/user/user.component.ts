import { Component, OnInit } from '@angular/core';

import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';

import {UserService} from "../../services/user.service";
import {MessageService} from "../../services/MessageService";

import {Users} from "../../models/users";
import {deleteSwalOpts} from "../../services/common";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../app.component.css']
})
export class UserComponent implements OnInit {

  obj_all: Users[];
  selectedObj: Users;
  obj: Users = new Users;

  constructor(private messageService: MessageService, private service: UserService) {
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

  /*update() {
    this.service.update(this.selectedObj)
      .subscribe(resp => {
        swal(resp.msg);
        this.clearAll();
      });
  }*/

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
    this.obj = new Users;
    this.selectedObj = new Users;
  }

}
