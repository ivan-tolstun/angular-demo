import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GuardService} from "./core/guards/portal-guard.service";
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  },
  {
    path: "main",
    canActivate: [GuardService.authenticated],
    component: MainLayoutComponent,
    children: [

    ]
  },
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
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
