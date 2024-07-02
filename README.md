# 1 Project initialization

Using "npm", create a new project with "routing" and "scss" for styles:

```
$ ng new angular-demo

Node.js version v21.2.0 detected.
Odd numbered Node.js versions will not enter LTS status and should not be used for production. For more information, please see https://nodejs.org/en/about/releases/.

? Would you like to add Angular routing? (y/N) y

? Which stylesheet format would you like to use?
CSS
❯ SCSS   [ https://sass-lang.com/documentation/syntax#scss              ]
Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
Less   [ http://lesscss.org                                             ]
```

<p>
  The project was created, but it uses an older version of Angular, version 16.
  However, this is a great opportunity to learn how to migrate Angular versions.
  I don't recommend manually changing the version in the "package.json" file.
  Instead, visit the website https://angular.dev/update-guide.
</p>

<p>
  By specifying the desired version there, you will find the migration commands and necessary changes.
  For example:
</p>

<p style="display: flex; flex-wrap: wrap; justify-content: flex-start;  align-items: start;">
  <img src="/readme-data/images/update-guide-1.png" width="400" alt="" style="border: 1px solid black; margin: 0.5rem;">
  <img src="/readme-data/images/update-guide-2.png" width="400" alt="" style="border: 1px solid black; margin: 0.5rem;">
</p>




---

# 2 Loading prime modules

<p> Here, we will use ready-made components from "primeng", "prim-icon", and "prim-flex". </p>

  <ul style="list-style-type: circle;">
    <li>
      Link to the <a href="https://primeng.org/installation">primeng website</a>
    </li>
    <li style="list-style-type: circle;">
      Link to the <a href="https://primeflex.org/installation">prime-flex website</a>
    </li>
    <li style="list-style-type: circle;">
      Link to the <a href="https://primeng.org/icons">primeng-icons website</a>
    </li>
  </ul>

  <p>
    Now we need to install these libraries and add styles for them to our project:
  </p>

  <p>Loading PrimeFlex modules</p>

  ```
  $ npm install primeflex
  ```

  <p>
    After installation you may include the library by importing from node_modules. <br>
    Add the following text to angular.json:
  </p>
  <p style="background: #dedfdf; padding: 2rem; border-radius: 10px;">
    ...<br>
    "styles": [<br>
    "/node_modules/primeflex/primeflex.css",<br>
    ...<br>
    ]<br>
  </p>

  <p>Loading PrimeNG modules</p>

  ```
  $ npm install primeng
  ```

  <p>
    Theme and Core styles are the necessary css files of the components,
    visit the Themes section for the complete list of available themes to choose from.
    Styles can either be imported at angular.json file.
  </p>
  <p style="background: #dedfdf; padding: 2rem; border-radius: 10px;">
    ...<br>
    "styles": [<br>
    "node_modules/primeng/resources/themes/lara-light-blue/theme.css",<br>
    "node_modules/primeng/resources/primeng.min.css",<br>
    ...<br>
    ]<br>
  </p>

  <p>Loading PrimeIcons modules</p>

  ```
  $ npm install primeicons
  ```

  <p>
    CSS file of the icon library needs to be imported in styles.scss of your application.
  </p>
  <p style="background: #dedfdf; padding: 2rem; border-radius: 10px;">
    @import "primeicons/primeicons.css";
  </p>




---

# 3 Core and shared modules

<h5> Core Module </h5>

  <p>
    The core module in Angular is typically used to house essential services that provide global functionalities
    throughout the application.
    It includes:
  </p>

  <ul style="list-style-type: circle;">
    <li>
      <span style="font-weight: bold;">Services: </span> Services that offer global functions, such as authentication, logging, data handling, and more.
    </li>
    <li style="list-style-type: circle;">
      <span style="font-weight: bold;">HTTP Interceptors: </span> Interceptors for intercepting and modifying HTTP requests and responses across the application.
    </li>
    <li style="list-style-type: circle;">
      <span style="font-weight: bold;">Data Models: </span> Shared data models used by various components and services.
    </li>
    <li style="list-style-type: circle;">
      <span style="font-weight: bold;">Guards: </span> Route guards that protect routes and provide permissions based on conditions like user authentication.
    </li>
  </ul>

  <h5> Shared Module </h5>

  <p>
    The shared module in Angular is designed to store components, directives, pipes,
    and other resources that can be used across different parts of the application, promoting code reusability
    and reducing duplication.
    It typically includes:
  </p>

  <ul style="list-style-type: circle;">
    <li>
      <span style="font-weight: bold;">Shared Components:</span> Components used in various parts of the application, such as buttons, modals, forms, etc.
    </li>
    <li style="list-style-type: circle;">
      <span style="font-weight: bold;">Shared Directives: </span> Directives that add additional functionality to HTML elements,
      such as form validation directives, animations, etc.
    </li>
    <li style="list-style-type: circle;">
      <span style="font-weight: bold;">Shared Pipes: </span> Pipes that format data for display in different parts of the application.
    </li>
  </ul>

  <p>
    Core and shared modules in Angular help structure and organize application code, making it more maintainable,
    scalable, and reusable. These modules contribute to improved application architecture and reduced
    coupling between different parts of the application.
  </p>




---


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


