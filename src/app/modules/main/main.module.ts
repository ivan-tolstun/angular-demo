import {NgModule} from '@angular/core'
import {LoginPageModule} from "../../pages/login/login-page.module";
import {MainRoutingModule} from "./main-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {UserProfilePageModule} from "../../pages/users/user-profile/user-profile-page.module";

@NgModule({
  declarations: [],
  imports: [
    MainRoutingModule,
    LoginPageModule,
    SharedModule,
    UserProfilePageModule
  ],
  exports: []
})
export class MainModule {
}
