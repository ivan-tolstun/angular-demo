import {NgModule} from '@angular/core'
import {LoginPageModule} from "../../pages/login/login-page.module";
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [],
  imports: [
    AuthenticationRoutingModule,
    LoginPageModule,
    SharedModule
  ],
  exports: []
})
export class AuthenticationModule {
}
