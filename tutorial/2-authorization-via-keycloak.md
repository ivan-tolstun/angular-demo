# How to get token from keycloak after redirect in Angular

To get a token from Keycloak after a redirect in an Angular application, 
you can use the keycloak-angular library which provides a streamlined way to integrate Keycloak with Angular applications. 
Below is a step-by-step guide:

## 1 Install Dependencies

<p> First, you need to install the required packages: </p>

```
$ npm install keycloak-angular keycloak-js                             
```




---

# 2 Configure Keycloak

<p> Create a configuration file for Keycloak, for example keycloak.config.ts: </p>

<p style="background: #dedfdf; padding: 2rem; border-radius: 10px;">
  // src/app/keycloak.config.ts <br><br>
  export const keycloakConfig = { <br>
    &nbsp; url: 'https://your-keycloak-server/auth', <br>
    &nbsp; realm: 'your-realm', <br>
    &nbsp; clientId: 'your-client-id' <br>
  }; <br>
</p>




---

# 3 Initialize Keycloak in the Angular App
<p> Modify your app.module.ts to initialize Keycloak: </p>

``` typescript
// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';
import { keycloakConfig } from './keycloak.config';

function initializeKeycloak(keycloak: KeycloakService) {
  return () => 
    keycloak.init({
      config: keycloakConfig,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      }
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }                               
```




---

# 4 Accessing the Token

<p> 
After the user is redirected back from Keycloak and successfully authenticated, 
you can access the token using the KeycloakService. 
Here’s an example of how you can use the service in a component: 
</p>

``` typescript
// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-keycloak-app';

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.printToken();
  }

  async printToken() {
    try {
      const token = await this.keycloakService.getToken();
      console.log('Token:', token);
    } catch (error) {
      console.error('Failed to load token', error);
    }
  }
}           
```




---

# 6 Protecting Routes

<p> 
You can protect routes by using the KeycloakAuthGuard. 
Here’s an example of how to apply it to routes: 
</p>

``` typescript
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [KeycloakAuthGuard],
    data: {
      roles: ['user'] // You can specify roles here
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private keycloak: KeycloakService) {}
}          
```




---

