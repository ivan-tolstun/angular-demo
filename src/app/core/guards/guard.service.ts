import {inject} from "@angular/core"
import {ActivatedRouteSnapshot, CanActivateFn, Router} from "@angular/router"
import {AuthorizationClientService} from "../api/clients/authorization/authorization-client.service"
import {map} from "rxjs";

export class GuardService {

  private constructor() {
  }

  public static authenticated: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
    const authClient = inject(AuthorizationClientService)
    const router: Router = inject(Router)
    return authClient
      .authenticated()
      .pipe(map(isLoggedIn => {
        if (!isLoggedIn) router.navigate(["authentication", "login"]);
        return isLoggedIn
      }))
  }
}
