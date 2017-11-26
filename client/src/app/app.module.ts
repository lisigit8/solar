import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormControl, FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { SitesComponent } from './sites/sites.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {MaintenanceModuleService} from "./services/maintenance-module.service";
import { HttpClientModule }    from '@angular/common/http';
import { WarrantyDetailsComponent } from './warranty-details/warranty-details.component';
import {LayoutModule} from "./layout/layout.module";
import {MatSelectModule, MatTableModule, MatSortModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    SitesComponent,
    WarrantyDetailsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [MaintenanceModuleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
