import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SitesComponent} from "../components/sites/sites.component";
import {WarrantyDetailsComponent} from "../components/warranty-details/warranty-details.component";
import {WarrantyInformationComponent} from "../components/warranty-information/warranty-information.component";
import {ContractorComponent} from "../components/contractor/contractor.component";
import {CustomerComponent} from "../components/customer/customer.component";
import {DeviceComponent} from "../components/device/device.component";
import {VendorComponent} from "../components/vendor/vendor.component";
import {DeviceNameComponent} from "../components/device-name/device-name.component";
import {BatchUploadComponent} from "../components/batch-upload/batch-upload.component";
import {InsertWarrantyInfoComponent} from "../components/insert-warranty-info/insert-warranty-info.component";
import {LoginComponent} from "../components/login/login.component";

import {AuthGuard} from "../_guards/auth.guard";
import {UnauthorizedComponent} from "../components/unauthorized/unauthorized.component";
import {UserComponent} from "../components/user/user.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: 'contractor', component: ContractorComponent},
  {path: 'site', component: SitesComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'user', component: UserComponent},
  {path: 'device', component: DeviceComponent},
  {path: 'device-name', component: DeviceNameComponent},
  {path: 'vendor', component: VendorComponent},
  {path: 'batch-upload', component: BatchUploadComponent},
  {path: 'insert-warranty-info', component: InsertWarrantyInfoComponent},
  //{ path: 'warranty-info/:id', component: WarrantyInformationComponent },
  //{path: '', redirectTo: '/documentation', pathMatch: 'full'},
  {
    path: 'documentation',
    component: WarrantyDetailsComponent,
    data: {access: ['ROLE_ADMIN', 'ROLE_TEST']},
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  {path: '**', redirectTo: '/documentation'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
