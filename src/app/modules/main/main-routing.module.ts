import {Inject, NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {LoginPageComponent} from "../../pages/login/login-page.component";
import {UserProfilePageComponent} from "../../pages/users/user-profile/user-profile-page.component";

const routes: Routes = [
  {
    path: 'user-profile',
    component: UserProfilePageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'user-profile'
  },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {}
