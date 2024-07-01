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

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: keycloakConfig,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
        //onLoad: 'check-sso',
        //silentCheckSsoRedirectUri:
        //window.location.origin + '/assets/silent-check-sso.html',
        //checkLoginIframe: false,
        //redirectUri: keycloakConfig.redirectUri
      }
    });
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
