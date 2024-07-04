import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core'
import {swingInTop} from "../../../shared/animations/swing-animation-trigger"
import {ActivatedRoute} from "@angular/router"
import {MessageService} from "primeng/api";
import {LanguageDto} from "../../../core/api/dto/common/language-dto";
import {UserRoleDtoV1, UserStatusDtoV1} from "../../../core/api/dto/users/user-dto";
import {TranslateService} from "@ngx-translate/core";
import {GlobalMessageService} from "../../../core/services/global-message-service";
import {UserFormOptions} from "../../../shared/components/users/user-form/models/user-form-options";
import {KeycloakService} from "keycloak-angular";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
  animations: [swingInTop()],
  providers: [MessageService]
})
export class UserProfilePageComponent implements OnInit {

  protected userEmail: string | undefined
  protected mobileStyle: boolean = false
  protected updateOptions: UserFormOptions | undefined = undefined
  private jwtHelper: JwtHelperService = new JwtHelperService()

  constructor(private readonly route: ActivatedRoute,
              private readonly translateService: TranslateService,
              private readonly keycloakService: KeycloakService,
              private readonly globalMessageService: GlobalMessageService,) {
  }

  ngOnInit(): void {
    this.keycloakService.getToken().then(token => {
      this.userEmail = JSON.parse(JSON.stringify(this.jwtHelper.decodeToken(token))).email
    })
    this.initUserUpdateOptions()
  }

  private initUserUpdateOptions(): void {
    this.updateOptions = UserFormOptions
      .builder()
      .requiredEmail(signal(false))
      .readonlyEmail(signal(true))
      .allowedUserRoles(signal([UserRoleDtoV1.Admin, UserRoleDtoV1.Manager]))
      .defaultUserRoles(signal([UserRoleDtoV1.Admin]))
      .allowedLanguages(signal([LanguageDto.English, LanguageDto.German]))
      .defaultLanguage(signal(LanguageDto.English))
      .allowedUserStatuses(signal([UserStatusDtoV1.ForceChangePassword, UserStatusDtoV1.Unconfirmed]))
      .defaultUserStatus(signal(UserStatusDtoV1.ForceChangePassword))
      .requiredStatus(signal(false))
      .hideStatus(signal(true))
      .build()
    this.updateOptions.requiredRoles.set(false)
  }

}
