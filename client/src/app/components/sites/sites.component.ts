import {Component, OnInit} from '@angular/core';

import {Site} from "../../models/site";

import {SiteService} from "../../services/site.service";
import {MessageService} from "../../services/MessageService";

import * as swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import {deleteSwalOpts} from "../../services/common";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['../../app.component.css']
})
export class SitesComponent implements OnInit {
  obj_all: Site[];
  selectedObj: Site;
  obj: Site = new Site;

  /*test: any;*/

  constructor(private messageService: MessageService, private service: SiteService) {
  }

  ngOnInit() {
    this.getAll();
    this.messageService.sendMessage("hideSites", "");
  }

  getAll(): void {
    this.service.getSites()
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

  clearAll(){
    this.getAll();
    this.obj = new Site;
    this.selectedObj = new Site;
  }

  /*hello(fg:any){
    this.test = fg;
    alert(fg);
  }*/

}
