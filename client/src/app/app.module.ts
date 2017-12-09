import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";

import {LayoutModule} from "./layout/layout.module";
import {AppRoutingModule} from "./app-routing/app-routing.module";

import { AppComponent } from './app.component';
import { SitesComponent } from './sites/sites.component';
import { WarrantyDetailsComponent } from './warranty-details/warranty-details.component';
import { WarrantyInformationComponent } from './warranty-information/warranty-information.component';

import {MaintenanceModuleService} from "./services/maintenance-module.service";
import {MessageService} from "./services/MessageService";
import { SiteService } from './services/site.service';
import { CustomerService } from './services/customer.service';
import { DeviceService } from './services/device.service';
import { VendorService } from './services/vendor.service';
import {ContractorService} from "./services/contractor.service";
import { DocumentsService } from './services/documents.service';
import { WarrantyService } from './services/warranty.service';

@NgModule({
  declarations: [
    AppComponent,
    SitesComponent,
    WarrantyDetailsComponent,
    WarrantyInformationComponent,
  ],
  imports: [
    LayoutModule,

    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),

    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MaintenanceModuleService,
    MessageService,
    SiteService,
    CustomerService,
    DeviceService,
    VendorService,
    ContractorService,
    DocumentsService,
    WarrantyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
