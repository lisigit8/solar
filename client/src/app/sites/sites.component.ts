import { Component, OnInit } from '@angular/core';

import { Site } from "../models/site";

import {SiteService} from "../services/site.service";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  sites: Site[];
  selectedSite: Site;
  /*test: any;*/

  constructor(private siteService: SiteService) { }

  onSelect(site: Site): void {
    this.selectedSite = site;
  }

  getSites(): void {
    this.siteService.getSites()
      .subscribe(sites => this.sites = sites);
  }

  ngOnInit() {
    this.getSites();
  }

  /*hello(fg:any){
    this.test = fg;
    alert(fg);
  }*/

}
