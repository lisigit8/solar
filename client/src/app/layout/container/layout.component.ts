import {Component, Input, OnInit} from '@angular/core';
import {Site} from "../../models/site";
import {SiteService} from "../../services/site.service";
import {MessageService} from "../../services/MessageService";
import {Subscription} from "rxjs/Subscription";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/template.css',
    '../../../assets/font-awesome/css/font-awesome.min.css']
})
export class LayoutComponent implements OnInit {
  selectedSite: any;
  sites: Site[];

  toShowSites: boolean = true;

  subscription: Subscription;

  constructor(private messageService: MessageService,
    private siteService: SiteService,) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        if (message.event == 'hideSites') {
          this.toShowSites = false;
        }
      }
    });
  }

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

}
