import {NgModule} from '@angular/core'
import {LoginPageComponent} from "../../pages/login/login-page.component";
import {LoginPageModule} from "../../pages/login/login-page.module";
import {PortalRoutingModule} from "./portal-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      PortalRoutingModule,
      LoginPageModule
    ],
    exports: [
    ]
})
export class PortalModule {}
