import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core'
import {MessageService} from "primeng/api"
import {LanguageDto} from "../../../../core/api/dto/common/language-dto"
import {UserRoleDtoV1, UserStatusDtoV1} from "../../../../core/api/dto/users/user-dto";
import {UserDtoV1} from "../../../../core/api/dto/users/user-dto";
import {ObjectExtension} from "../../../../core/util/object-extension";
import {
  GetUserCmdV1,
  UpdateUserCmdV1
} from "../../../../core/api/cmd/users/user-cmd";
import {UserFormOptions} from "../user-form/models/user-form-options";
import {TranslateService} from "@ngx-translate/core";
import {GlobalMessageService} from "../../../../core/services/global-message-service";
import {UserClientService} from "../../../../core/api/clients/users/user-client.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
  providers: [MessageService]
})
export class UserUpdateComponent implements OnInit {

  @Input()
  public mobileStyle: boolean = false
  @Output()
  public organizationNameChange: EventEmitter<string> = new EventEmitter()
  @Output()
  public whenUpdated: EventEmitter<UserDtoV1> = new EventEmitter()
  @Output()
  public whenUpdateFailed: EventEmitter<any> = new EventEmitter()
  @Output()
  public userChange: EventEmitter<UserDtoV1> = new EventEmitter()

  protected isFormValid: boolean = false
  protected dataLoaded = false
  protected isAddressEditingPanelOpen: boolean = false
  protected email: string | undefined
  protected status: UserStatusDtoV1 | undefined
  protected roles: Array<UserRoleDtoV1> | undefined
  protected firstName: string | undefined
  protected lastName: string | undefined
  protected languageCode: LanguageDto | undefined
  private _user: UserDtoV1 = UserDtoV1.builder().build()
  private _userOptions: UserFormOptions = UserFormOptions.builder().build()

  constructor(private readonly translateService: TranslateService,
              private readonly globalMessageService: GlobalMessageService,
              private readonly userService: UserClientService) {
  }

  ngOnInit(): void {
  }

  @Input()
  public set userEmail(value: string) {
    if (value === this.user?.email) return
    this.user = UserDtoV1.builder().email(value).build()
    this.loadUserData(value)
  }

  @Input()
  public set user(value: UserDtoV1) {
    if (ObjectExtension.deepEqual(value, this._user)) return
    this._user = ObjectExtension.deepClone(value)
    this.email = this._user.email
    this.status = this._user.status
    this.roles = this._user.roles
    this.firstName = this._user.firstName
    this.lastName = this._user.lastName
    this.languageCode = this._user.languageCode
  }
  public get user(): UserDtoV1 {
    return this._user
  }

  @Input()
  public set userOptions(value: UserFormOptions) {
    if (value == null || ObjectExtension.deepEqual(value, this._userOptions)) return
    this._userOptions = value
  }
  public get userOptions(): UserFormOptions {
    return this._userOptions
  }

  protected isUserChanged(): boolean {
    const isStatusChanged =
      !ObjectExtension.deepEqual(this.status, this.user.status)
    const isRolesChanged =
      !ObjectExtension.deepEqual(this.roles, this.user.roles)
    const isFirstNameChanged =
      !ObjectExtension.deepEqual(this.firstName, this.user.firstName)
    const isLastNameChanged =
      !ObjectExtension.deepEqual(this.lastName, this.user.lastName)
    const isLanguageCodeChanged =
      !ObjectExtension.deepEqual(this.languageCode, this.user.languageCode)
    return isStatusChanged || isRolesChanged || isFirstNameChanged || isLastNameChanged || isLanguageCodeChanged
  }

  private loadUserData(email: string): void {
    this.dataLoaded = false
    this.userService
      .findUser(
        GetUserCmdV1
          .builder()
          .userEmail(email)
          .build()
      )
      .subscribe(
        (user: UserDtoV1) => {
          this.user = user
          this.dataLoaded = true
        },
        (error: any) => {
          console.error(error)
          this.globalMessageService.showError('portal.user.update.userLoadingError', error.message ?? error)
        }
      )
  }

  protected updateUser() {
    if (!this.isFormValid) return
    const updateUserCmd = this.buildUpdateUserCmd()
    this.dataLoaded = false
    this.userService
      .updateUser(updateUserCmd)
      .pipe(
        catchError(error => {
          this.dataLoaded = true
          this.globalMessageService.showError(
            'portal.user.update.userUpdateError', error.message ?? error)
          this.whenUpdateFailed.emit()
          return throwError(error);
        })
      )
      .subscribe(
        (user: UserDtoV1) => {
          this.dataLoaded = true
          this.globalMessageService.showInfo(
            undefined, "portal.user.update.userUpdatedSuccessfully")
          this.whenUpdated.emit(user)
        }
      )
  }

  private buildUpdateUserCmd(): UpdateUserCmdV1 {
    const isStatusChanged =
      !ObjectExtension.deepEqual(this.status, this.user.status)
    const isRolesChanged =
      !ObjectExtension.deepEqual(this.roles, this.user.roles)
    const isFirstNameChanged =
      !ObjectExtension.deepEqual(this.firstName, this.user.firstName)
    const isLastNameChanged =
      !ObjectExtension.deepEqual(this.lastName, this.user.lastName)
    const isLanguageCodeChanged =
      !ObjectExtension.deepEqual(this.languageCode, this.user.languageCode)
    this.dataLoaded = false
    return UpdateUserCmdV1.builder()
      .userEmail(this.email!!)
      .newStatus((isStatusChanged) ? this.status : undefined)
      .newRoles((isRolesChanged) ? this.roles : undefined)
      .newFirstName((isFirstNameChanged) ? this.firstName : undefined)
      .newLastName((isLastNameChanged) ? this.lastName : undefined)
      .newLanguageCode((isLanguageCodeChanged) ? this.languageCode : undefined)
      .build()
  }

}


