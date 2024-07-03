import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {Observable, throwError} from "rxjs"
import {UserDtoV1, UserRoleDtoV1} from "../../dto/users/user-dto"
import {catchError, map} from "rxjs/operators"
import {NumberOfRowsDtoV1} from "../../dto/common/number-of-rows-dto"
import {
  CountUsersCmdV1,
  CreateUserCmdV1, DeleteUserCmdV1,
  GetUserCmdV1,
  GetUsersCmdV1, UpdateUserCmdV1
} from "../../cmd/users/user-cmd";
import {ObjectExtension} from "../../../util/object-extension";
import {LanguageDto} from "../../dto/common/language-dto";
import {GlobalMessageService} from "../../../services/global-message-service";
import {keycloakConfig} from "../../../../keycloak.config";

@Injectable({
  providedIn: 'root'
})
export class UserClientService {

  constructor(private readonly http: HttpClient,
              private readonly globalMessageService: GlobalMessageService) {
  }

  public findUser(cmd: GetUserCmdV1): Observable<UserDtoV1> {

    const path: string = `/realms/${keycloakConfig.realm}/protocol/openid-connect/userinfo`
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http
      .get<any>(encodeURI(path), {headers: headers})
      .pipe(
        map((user: any) => this.toUserDto(user)),
        // catchError(error => {
        //   this.globalMessageService.showError('User access error', error.message ?? error)
        //   return throwError(error);
        // })
      )
  }

  public findUsers(cmd: GetUsersCmdV1): Observable<Array<UserDtoV1>> {
    const path: string = ""
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http
      .get<Array<any>>(encodeURI(path), {headers: headers})
      .pipe(
        map(users => users.map((user: any) => this.toUserDto(user)),
          // catchError(error => {
          //   this.globalMessageService.showError('User access error', error.message ?? error)
          //   return throwError(error);
          // })
        ))
  }

  public countUsers(cmd: CountUsersCmdV1): Observable<NumberOfRowsDtoV1> {
    const path: string = ""
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.get<NumberOfRowsDtoV1>(encodeURI(path), {headers: headers})
  }

  public createUser(cmd: CreateUserCmdV1): Observable<UserDtoV1> {
    const path: string = ""
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http
      .put<any>(encodeURI(path), cmd, {headers: headers})
      .pipe(
        map((user: any) => this.toUserDto(user)),
        // catchError(error => {
        //   this.globalMessageService.showError('User access error', error.message ?? error)
        //   return throwError(error);
        // })
      )
  }

  public updateUser(cmd: UpdateUserCmdV1): Observable<UserDtoV1> {
    const path: string = ""
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http
      .patch<any>(encodeURI(path), cmd, {headers: headers})
      .pipe(
        map((user: any) => this.toUserDto(user)),
        // catchError(error => {
        //   this.globalMessageService.showError('User access error', error.message ?? error)
        //   return throwError(error);
        // })
      )
  }

  public deleteUser(cmd: DeleteUserCmdV1): Observable<UserDtoV1> {
    const path: string = ""
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http
      .delete<boolean>(encodeURI(path), {headers: headers})
      .pipe(
        map((user: any) => this.toUserDto(user)),
        // catchError(error => {
        //   this.globalMessageService.showError('User access error', error.message ?? error)
        //   return throwError(error);
        // })
      )
  }

  private toUserDto(user: any): UserDtoV1 {
    const roles = user?.roles as Array<any>
    return UserDtoV1.builder()
      .email(user.email)
      .emailVerified(user.email_verified)
      .roles(roles
        ?.map(role => ObjectExtension.stringToEnum(UserRoleDtoV1, role)!!)
        ?.filter(role => role != null)
      )
      .firstName(user?.given_name)
      .lastName(user?.family_name)
      .languageCode(
        (user.languageCode != null)
          ? ObjectExtension.stringToEnum(LanguageDto, user.languageCode)
          : LanguageDto.English
      )
      .build()
  }

}
