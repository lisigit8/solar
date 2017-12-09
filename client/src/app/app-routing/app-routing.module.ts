import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SitesComponent} from "../sites/sites.component";
import {WarrantyDetailsComponent} from "../warranty-details/warranty-details.component";
import {WarrantyInformationComponent} from "../warranty-information/warranty-information.component";

const routes: Routes = [
  { path: 'sites', component: SitesComponent },
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
