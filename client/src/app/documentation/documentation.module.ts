import {NgModule} from "@angular/core";
import {documentationRouter} from "./documentation.router";
import {RouterModule} from "@angular/router";
import {DocumentationComponent} from "./documentation.component";
import {MatButtonModule} from "@angular/material";

const ENTITY_STATE = [
  ...documentationRouter
];

@NgModule(
  {
    declarations: [
      DocumentationComponent
    ],
    imports: [
      RouterModule.forRoot(ENTITY_STATE, {useHash: true, enableTracing: false}),
      MatButtonModule
    ],
    entryComponents: [DocumentationComponent],
    providers: []
  }
)
export class DocumentationModule {
}
