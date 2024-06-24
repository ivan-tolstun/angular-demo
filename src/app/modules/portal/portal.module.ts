import {NgModule} from '@angular/core'
import {LoginComponent} from "../../pages/login/login.component";
import {LoginModule} from "../../pages/login/login.module";
import {PortalRoutingModule} from "./portal-routing.module";

@NgModule({
    declarations: [
    ],
    imports: [
      PortalRoutingModule,
      LoginModule
    ],
    exports: [
    ]
})
export class PortalModule {}
