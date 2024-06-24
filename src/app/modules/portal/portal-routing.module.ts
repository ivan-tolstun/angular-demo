import {Inject, NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {LoginPageComponent} from "../../pages/login/login-page.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login'
  },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortalRoutingModule {}
