import { Component, OnInit } from '@angular/core';
import { Site } from "../models/site";
import {MaintenanceModuleService} from "../services/maintenance-module.service";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  constructor(private service: MaintenanceModuleService) { }

  sites: Site[];

  selectedSite: Site;

  onSelect(site: Site): void {
    this.selectedSite = site;
  }

  getSites(): void {
    this.service.getSites()
      .subscribe(sites => this.sites = sites);
  }

  ngOnInit() {
    this.getSites();
  }

}
