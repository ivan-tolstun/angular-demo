import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GuardService} from "./core/guards/guard.service";
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";
import {KeycloakAuthGuard} from "keycloak-angular";
import {CustomKeycloakAuthGuard} from "./core/guards/keycloak-guard.service";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  },
  {
    path: "main",
    canActivate: [CustomKeycloakAuthGuard], // [...,GuardService.authenticated,...]
    component: MainLayoutComponent,
    children: [
    ]
  },
  // {
  //   path: 'authentication',
  //   loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  // },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'main'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
