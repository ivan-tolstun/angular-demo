import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  Signal,
  ViewEncapsulation
} from '@angular/core'
import {MessageService} from "primeng/api"
import {UserFormOptions} from "./models/user-form-options"
import {UserRoleDtoV1, UserStatusDtoV1} from "../../../../core/api/dto/users/user-dto";
import {LanguageDto} from "../../../../core/api/dto/common/language-dto";
import {PortalRegex} from "../../../../core/validators/portal-regex";
import {ObjectExtension} from "../../../../core/util/object-extension";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class UserFormComponent implements OnInit {

  @Input()
  public readonly: boolean = false
  @Input()
  public mobileStyle: boolean = false
  @Input()
  public dataLoaded: boolean = true
  @Output()
  public emailChange: EventEmitter<string> = new EventEmitter()
  @Output()
  public statusChange: EventEmitter<UserStatusDtoV1> = new EventEmitter()
  @Output()
  public rolesChange: EventEmitter<Array<UserRoleDtoV1>> = new EventEmitter()
  @Output()
  public firstNameChange: EventEmitter<string> = new EventEmitter()
  @Output()
  public lastNameChange: EventEmitter<string> = new EventEmitter()
  @Output()
  public languageCodeChange: EventEmitter<LanguageDto> = new EventEmitter()
  @Output()
  public whenUserValid: EventEmitter<boolean> = new EventEmitter()
  @Output()
  public whenUserInvalid: EventEmitter<boolean> = new EventEmitter()

  protected readonly emailValidator = PortalRegex.emailValidator
  protected allowedUserRolesWithTranslation$: Signal<Array<{ code: UserRoleDtoV1; name: string }>> = signal([])
  protected allowedLanguagesWithTranslation$: Signal<Array<{ code: LanguageDto; name: string }>> = signal([])
  protected allowedUserStatusesWithTranslation$: Signal<Array<{ code: UserStatusDtoV1; name: string }>> = signal([])
  protected privacyAndTermsAccepted: boolean = false
  protected isFormValid: boolean = false

  private _email: string | undefined
  private _confirmEmail: string | undefined
  private _status: UserStatusDtoV1 | undefined
  private _roles: Array<UserRoleDtoV1> | undefined
  private _firstName: string | undefined
  private _lastName: string | undefined
  private _languageCode: LanguageDto | undefined
  private _userOptions: UserFormOptions = UserFormOptions.builder().build()

  constructor(private readonly translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.initializeTranslations()
    this.roles = this.userOptions.defaultUserRoles()
    this.languageCode = this.userOptions.defaultLanguage()
    this.status = this.userOptions.defaultUserStatus()
  }

  @Input()
  public set email(value: string | undefined) {
    if (value == this._email) return
    this._email = value
    this.emailChange.emit(value)
    this.validate()
  }
  public get email(): string | undefined {
    return this._email
  }

  set confirmEmail(value: string | undefined) {
    if (value === this._confirmEmail) return
    this._confirmEmail = value
    this.validate()
  }
  get confirmEmail(): string | undefined {
    return this._confirmEmail
  }

  @Input()
  public set status(value: UserStatusDtoV1 | undefined) {
    if (value == this._status) return
    this._status = value
    this.statusChange.emit(value)
    this.validate()
  }
  public get status(): UserStatusDtoV1 | undefined {
    return this._status
  }

  @Input()
  public set roles(value: Array<UserRoleDtoV1> | undefined) {
    if (value == this._roles) return
    this._roles = value
    this.rolesChange.emit(value)
    this.validate()
  }
  public get roles(): Array<UserRoleDtoV1> | undefined {
    return this._roles
  }

  @Input()
  public set firstName(value: string | undefined) {
    if (value == this._firstName) return
    this._firstName = value
    this.firstNameChange.emit(value)
    this.validate()
  }
  public get firstName(): string | undefined {
    return this._firstName
  }

  @Input()
  public set lastName(value: string | undefined) {
    if (value == this._lastName) return
    this._lastName = value
    this.lastNameChange.emit(value)
    this.validate()
  }
  public get lastName(): string | undefined {
    return this._lastName
  }

  @Input()
  public set languageCode(value: LanguageDto | undefined) {
    if (value == this._languageCode) return
    this._languageCode = value
    this.languageCodeChange.emit(value)
    this.validate()
  }
  public get languageCode(): LanguageDto | undefined {
    return this._languageCode
  }

  @Input()
  public set userOptions(value: UserFormOptions) {
    if (value == null || ObjectExtension.deepEqual(value, this._userOptions)) return
    this._userOptions = value
  }
  public get userOptions(): UserFormOptions {
    return this._userOptions
  }

  protected validateEmail(): boolean {
    return (this.userOptions.requiredEmail())
      ? this.email != null && this.email.length > 0 && this.emailValidator.test(this.email)
      : true
  }

  protected validateConfirmEmail(): boolean {
    return (this.userOptions.requiredEmail())
      ? this.confirmEmail != null && this.emailValidator.test(this.confirmEmail) && this.email === this.confirmEmail
      : true
  }

  protected validateStatus(): boolean {
    return (this.userOptions.requiredStatus())
      ? this.status != null
      : true
  }

  protected validateRoles(): boolean {
    return (this.userOptions.requiredRoles())
      ? this.roles != null && this.roles.length > 0
      : true
  }

  protected validateFirstName(): boolean {
    return (this.userOptions.requiredFirstName())
      ? this.firstName != null && this.firstName.length > 0
      : true
  }

  protected validateLastName(): boolean {
    return (this.userOptions.requiredLastName())
      ? this.lastName != null && this.lastName.length > 0
      : true
  }

  protected validateLanguageCode(): boolean {
    return (this.userOptions.requiredLanguageCode())
      ? this.languageCode != null
      : true
  }

  protected validate(): boolean {
    const emailValid = this.validateEmail()
    const confirmEmailValid = this.validateConfirmEmail()
    const statusValid = this.validateStatus()
    const rolesValid = this.validateRoles()
    const firstNameValid = this.validateFirstName()
    const lastNameValid = this.validateLastName()
    const languageCodeValid = this.validateLanguageCode()
    const isValid = emailValid && confirmEmailValid && statusValid && rolesValid
      && firstNameValid && lastNameValid && languageCodeValid
    if (isValid !== this.isFormValid && isValid) {
      this.isFormValid = isValid
      this.whenUserValid.emit()
    }
    if (isValid !== this.isFormValid && !isValid) {
      this.isFormValid = isValid
      this.whenUserInvalid.emit()
    }
    return isValid
  }


  private initializeTranslations(): void {
    this.translateAllowedLanguages()
    this.translateAllowedUserRoles()
    this.translateAllowedStatuses()
    this.translateService
      .onLangChange
      .subscribe(lang => {
        this.translateAllowedLanguages()
        this.translateAllowedUserRoles()
        this.translateAllowedStatuses()
      })
  }

  private translateAllowedLanguages(): void {
    this.allowedLanguagesWithTranslation$ = computed(() =>
      this.userOptions
        .allowedLanguages()
        .map(allowedLanguage => {
          const trKey = "common.language." + allowedLanguage.toLowerCase()
          const translatedValue = this.translateService.instant(trKey)
          return {name: translatedValue, code: allowedLanguage}
        })
    )
  }

  private translateAllowedUserRoles(): void {
    this.allowedUserRolesWithTranslation$ = computed(() =>
      this.userOptions
        .allowedUserRoles()
        .map(allowedRole => {
          let trKey = ""
          switch (allowedRole) {
            case UserRoleDtoV1.Admin:
              trKey = "common.userRole.admin";
              break;
            case UserRoleDtoV1.Manager:
              trKey = "common.userRole.manager";
              break;
          }
          const translatedValue = this.translateService.instant(trKey)
          return {name: translatedValue, code: allowedRole}
        })
    )
  }

  private translateAllowedStatuses(): void {
    this.allowedUserStatusesWithTranslation$ = computed(() =>
      this.userOptions
        .allowedUserStatuses()
        .map(allowedStatus => {
          let trKey = ""
          switch (allowedStatus) {
            case UserStatusDtoV1.Unconfirmed:
              trKey = "common.userStatus.unconfirmed";
              break;
            case UserStatusDtoV1.Confirmed:
              trKey = "common.userStatus.confirmed";
              break;
            case UserStatusDtoV1.ForceChangePassword:
              trKey = "common.userStatus.forceChangePassword";
              break;
            case UserStatusDtoV1.Archived:
              trKey = "common.userStatus.archived";
              break;
          }
          const translatedValue = this.translateService.instant(trKey)
          return {name: translatedValue, code: allowedStatus}
        })
    )
  }

}
