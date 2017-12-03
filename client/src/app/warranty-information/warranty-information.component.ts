import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WarrentyDetails} from "../models/warrenty-details";
import {MaintenanceModuleService} from "../services/maintenance-module.service";
import {Site} from "../models/site";
import {Device} from "../models/device";
import {Vendor} from "../models/vendor";
import {Contractor} from "../models/contractor";
import {Subscription} from "rxjs/Subscription";
import {MessageService} from "../MessageService";
import {Users} from "../models/users";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-warranty-information',
  templateUrl: './warranty-information.component.html',
  styleUrls: ['../sites/sites.component.css']
})
export class WarrantyInformationComponent implements OnInit,OnDestroy {
  @Input()
    id: string;

  sites: Site[];
  subscription: Subscription;
  data = new FormData();
  toInsert: boolean = false;

  /*@Output()
  evt: EventEmitter<string> = new EventEmitter();*/

  devices: Device[];
  vendors: Vendor[];
  contractors: Contractor[];
  users: Users[];

  wd: WarrentyDetails;
  //id: string = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute,
              private service: MaintenanceModuleService,
              private messageService: MessageService,
              private http: HttpClient
  ) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if(message.event=='rowSelected'){
        this.getSites();
        this.getDevices();
        this.getVendors();
        this.getContractors();
        this.getWarrantyDetailsByWarrantyId(message.data._id);
      }
    });
  }

  /*clickme() {
    this.evt.emit('a');
  }*/
  onSiteSelect1(site: Site): void {
    /*alert(site.name);
    alert(this.selectedSite.name);*/
  }
  onSiteSelect(): void {
    //alert(this.selectedSiteId);
  }
  getSites(): void {
    this.service.getSites()
      .subscribe(sites => this.sites = sites);
  }
  getDevices(): void {
    this.service.getDevices()
      .subscribe(devices => this.devices = devices);
  }
  getVendors(): void {
    this.service.getVendors()
      .subscribe(vendors => this.vendors = vendors);
  }
  getContractors(): void {
    this.service.getContractors()
      .subscribe(contractors => this.contractors = contractors);
  }
  getUsers(): void {
    this.service.getUsers()
      .subscribe(users => this.users = users);
  }
  getWarrantyDetailsByWarrantyId(id: string): void {
    this.service.getWarrantyDetailsByWarrantyId(id)
      .subscribe(wd =>{
        this.wd = wd;
        this.getDocumentsByWarrantyId(this.wd._id);
      });
  }
  getDocumentsByWarrantyId(warranty_id: string): void {
    this.service.getDocumentsByWarrantyId(warranty_id)
      .subscribe(documents =>{
        this.wd.documents = documents;
      });
  }

  ngOnInit() {
    this.getSites();
    this.getDevices();
    this.getVendors();
    this.getContractors();
    this.getUsers();
    this.getWarrantyDetailsByWarrantyId(this.id);
  }

  updateWarrantyInfo() {
     this.service.updateWarrantyInfo(this.wd)
       .subscribe(resp => alert(resp.msg));
  }
  updateOrInsertWarrantyInfo(){
    if(this.toInsert){
      this.insertWarrantyInfo();
    }else{
      this.updateWarrantyInfo();
    }

    this.insertDocs(this.data);
  }
  remove(){
    this.service.removeWarrantyInfo(this.wd._id).subscribe(resp=>{
      this.wd = new WarrentyDetails;
      this.toInsert = true;
      this.messageService.sendMessage("dataUpdated","");
      alert(resp.msg);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDocChange(event) {
    if(event.target.files.length > 0) {
     /* event.target.files.forEach(item=>{*/
        this.data.append('files',  event.target.files[0]);
      /*});*/

    }
  }
  insertDocs(data:any):void{
    //this.http.post('http://localhost:3000/api/documents',data)
    this.service.insertDocs(data).subscribe(resp=>{
      resp.map(id => {
        this.service.getDocumentsById(id).subscribe(document=>{
          document.warrantyInfo=this.wd;
          this.service.updateDocument(document).subscribe(resp=>{
            //alert(resp.msg);

            this.messageService.sendMessage("dataUpdated","");
            this.messageService.sendMessage("rowSelected",this.wd);
          });
        });
      });
    });
  }
  onClickOnNew(){
    this.wd = new WarrentyDetails;
    this.toInsert = true;

    this.messageService.sendMessage("dataUpdated","");
  }
  insertWarrantyInfo() {
    this.service.insertWarrantyInfo(this.wd)
      .subscribe(resp => alert(resp.msg));
  }

}
