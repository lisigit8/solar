import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SitesComponent} from "../sites/sites.component";
import {WarrantyDetailsComponent} from "../warranty-details/warranty-details.component";

const routes: Routes = [
  { path: 'sites', component: SitesComponent },
  { path: 'documentation', component: WarrantyDetailsComponent }
  /*{ path: '', redirectTo: '/documentation', pathMatch: 'full' },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true})
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
