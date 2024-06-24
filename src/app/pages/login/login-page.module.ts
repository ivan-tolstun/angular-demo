import {NgModule} from '@angular/core'
import {LoginPageComponent} from "./login-page.component";
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CardModule
  ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginPageModule {
}
