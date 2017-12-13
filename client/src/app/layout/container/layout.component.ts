import {Component, Input, OnInit} from '@angular/core';
import {Site} from "../../models/site";
import {SiteService} from "../../services/site.service";
import {MessageService} from "../../services/MessageService";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css',
    /*'../../../assets/css/bootstrap.min.css',*/
    '../../../assets/css/template.css',
    '../../../assets/font-awesome/css/font-awesome.min.css']
})
export class LayoutComponent implements OnInit {
  private selectUndefinedOptionValue: any;
  selectedSite: any;
  sites: Site[];

  constructor(private messageService: MessageService,
    private siteService: SiteService,) {}

  ngOnInit() {
    this.getSites();
  }

  getSites(): void {
    this.siteService.getSites()
      .subscribe(sites => this.sites = sites);
  }

  renew(): void {
    this.messageService.sendMessage("renewClicked", "");
  }

  onSiteSelect(): void {
    this.messageService.sendMessage("siteSelected", this.selectedSite);
  }

  onSiteChange(){
    if(this.selectedSite == "renew"){
      this.renew();
    }else{
      this.onSiteSelect();
    }
  }

}
