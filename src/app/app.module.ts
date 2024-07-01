import {APP_INITIALIZER, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HashLocationStrategy, LocationStrategy} from "@angular/common"
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http"
import {MainLayoutModule} from "./layouts/main-layout/main-layout.module"
import {TranslateHttpLoader} from "@ngx-translate/http-loader"
import {TranslateLoader, TranslateModule} from "@ngx-translate/core"
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular"
import {keycloakConfig} from "./keycloak.config"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak
      .init({
        config: keycloakConfig,
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false
        },
        // Specify URLs that don't require tokens
        bearerExcludedUrls: []
      })
      .then(authenticated => {
        if (authenticated) {
          keycloak.keycloakEvents$.subscribe({
            next: (event) => {
              // Set up automatic token refresh
              if (event.type.toString() === "OnTokenExpired")
                keycloak.updateToken(30).catch(() => { keycloak.login() })
            }
          })
        }
      })
}

@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MainLayoutModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
})
export class AppModule {
}
