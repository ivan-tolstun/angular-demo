import {Injectable} from '@angular/core'
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {catchError} from "rxjs/operators"
import {AuthorizationClientService} from "../api/clients/authorization/authorization-client.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authClient: AuthorizationClientService,) {}

    intercept(request: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        const errorHandler = (err: any) => {
            if (err.status === 401) {
                // TODO: Not used yet. Remove if not needed.
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }
        return next
            .handle(request)
            .pipe(catchError(errorHandler))
    }

}
