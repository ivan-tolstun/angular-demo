import {NgModule} from '@angular/core'
import {LoginPageComponent} from "./login-page.component";
import {CardModule} from "primeng/card";
import {ReactiveFormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {ImageModule} from "primeng/image";

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CardModule,
    ReactiveFormsModule,
    Button,
    ImageModule
  ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginPageModule {
}
