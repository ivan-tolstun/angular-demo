import {inject, Injectable} from "@angular/core"
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router"
import {AuthorizationClientService} from "../api/clients/authorization/authorization-client.service"
import {map} from "rxjs";
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class CustomKeycloakAuthGuard extends KeycloakAuthGuard {
  constructor(override readonly router: Router,
              private readonly keycloak: KeycloakService) {
    super(router, keycloak);
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot,
                               state: RouterStateSnapshot) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }
    // Allow the user to proceed if all the required roles are present.
    return this.authenticated
  }
}
