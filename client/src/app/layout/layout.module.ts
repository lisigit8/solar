import {NgModule} from "@angular/core";
import {layoutRout} from "./layout.routing";
import {RouterModule} from "@angular/router";
import {LayoutComponent} from "./container/layout.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
const ENTITY_STATES = [
  ...layoutRout
];

@NgModule({
  imports:[RouterModule.forRoot(ENTITY_STATES,{useHash:true}),
    NgbModule.forRoot()],
  declarations:[LayoutComponent],
  entryComponents:[],
  providers:[]
})
export class LayoutModule{

}
