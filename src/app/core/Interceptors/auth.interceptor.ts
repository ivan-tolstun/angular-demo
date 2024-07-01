import {Injectable} from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import {flatMap, from, map, Observable} from 'rxjs'
import {ActivatedRoute, Router} from "@angular/router"
import {AuthorizationClientService} from "../api/clients/authorization/authorization-client.service";
import {KeycloakService} from "keycloak-angular";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private keycloak: KeycloakService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    return from(this.keycloak.getToken())
      .pipe(flatMap(token => {
        return token != null
          ? next.handle(request.clone({setHeaders: {Authorization: `Bearer ${token}`}}))
          : next.handle(request)
      }))
  }
}

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//
//   constructor(private authClient: AuthorizationClientService,
//               private router: Router,
//               private route: ActivatedRoute) {
//   }
//
//   intercept(request: HttpRequest<any>,
//             next: HttpHandler): Observable<HttpEvent<any>> {
//     // add auth header with jwt if user is logged in and request is to the api url
//     return this.authClient
//       .accessCurrentToken()
//       .pipe(flatMap(token => {
//         return token != null
//           ? next.handle(request.clone({setHeaders: {Authorization: `Bearer ${token}`}}))
//           : next.handle(request)
//       }))
//   }
// }
