import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SitesComponent} from "../sites/sites.component";
import {WarrantyDetailsComponent} from "../warranty-details/warranty-details.component";
import {WarrantyInformationComponent} from "../warranty-information/warranty-information.component";
import {ContractorComponent} from "../contractor/contractor.component";
import {CustomerComponent} from "../customer/customer.component";
import {DeviceComponent} from "../device/device.component";
import {VendorComponent} from "../vendor/vendor.component";

const routes: Routes = [
  { path: 'site', component: SitesComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'contractor', component: ContractorComponent },
  { path: 'documentation', component: WarrantyDetailsComponent },
  //{ path: 'warranty-info/:id', component: WarrantyInformationComponent },
  { path: '', redirectTo: '/documentation', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true})
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
