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
  MatNativeDateModule,
  MatCheckboxModule,
} from "@angular/material";

//import {LayoutModule} from "./layout/layout.module";
import {AppRoutingModule} from "./app-routing/app-routing.module";

import { AppComponent } from './app.component';
import { SitesComponent } from './sites/sites.component';
import { WarrantyDetailsComponent } from './warranty-details/warranty-details.component';
import { WarrantyInformationComponent } from './warranty-information/warranty-information.component';
import { DeviceNameComponent } from './device-name/device-name.component';
import {LayoutComponent} from "./layout/container/layout.component";
import { ContractorComponent } from './contractor/contractor.component';
import { CustomerComponent } from './customer/customer.component';
import { DeviceComponent } from './device/device.component';
import { VendorComponent } from './vendor/vendor.component';

import {MessageService} from "./services/MessageService";
import { SiteService } from './services/site.service';
import { CustomerService } from './services/customer.service';
import { DeviceService } from './services/device.service';
import { VendorService } from './services/vendor.service';
import {ContractorService} from "./services/contractor.service";
import { DocumentsService } from './services/documents.service';
import { WarrantyService } from './services/warranty.service';
import { SendViaService } from './services/send-via.service';
import { DeviceNameService } from './services/device-name.service';
import { BatchUploadComponent } from './batch-upload/batch-upload.component';
import { InsertWarrantyInfoComponent } from './insert-warranty-info/insert-warranty-info.component';

@NgModule({
  declarations: [
    AppComponent,
    SitesComponent,
    WarrantyDetailsComponent,
    WarrantyInformationComponent,
    ContractorComponent,
    CustomerComponent,
    DeviceComponent,
    VendorComponent,
    DeviceNameComponent,
    LayoutComponent,
    BatchUploadComponent,
    InsertWarrantyInfoComponent
  ],
  imports: [
    //LayoutModule,

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
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [
    MessageService,
    SiteService,
    CustomerService,
    DeviceService,
    VendorService,
    ContractorService,
    DocumentsService,
    WarrantyService,
    SendViaService,
    DeviceNameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
