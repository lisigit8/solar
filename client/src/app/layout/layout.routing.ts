import {Routes} from "@angular/router";
import {LayoutComponent} from "./container/layout.component";

export const layoutRout:Routes=[
  {
    path:"",
    component:LayoutComponent,
    outlet:"container"
  }
]
