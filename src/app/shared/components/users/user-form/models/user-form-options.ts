import {Builder, IBuilder} from "builder-pattern"
import {signal, WritableSignal} from "@angular/core";
import {LanguageDto} from "../../../../../core/api/dto/common/language-dto";
import {UserRoleDtoV1, UserStatusDtoV1} from "../../../../../core/api/dto/users/user-dto";

export abstract class UserFormOptions {

  private static initialBuilder(): IBuilder<UserFormOptions> {
    return Builder<UserFormOptions>()
      .allowedLanguages(signal([]))
      .allowedUserRoles(signal([]))
      .allowedUserStatuses(signal([]))
      .defaultLanguage(signal(LanguageDto.English))
      .defaultUserRoles(signal([]))
      .defaultUserStatus(signal(UserStatusDtoV1.Unconfirmed))
      .readonlyEmail(signal(false))
      .readonlyStatus(signal(false))
      .readonlyRoles(signal(false))
      .readonlyFirstName(signal(false))
      .readonlyLastName(signal(false))
      .readonlyLanguageCode(signal(false))
      .requiredEmail(signal(true))
      .requiredStatus(signal(true))
      .requiredRoles(signal(true))
      .requiredFirstName(signal(true))
      .requiredLastName(signal(true))
      .requiredLanguageCode(signal(true))
      .hideEmail(signal(false))
      .hideStatus(signal(false))
      .hideRoles(signal(false))
      .hideFirstName(signal(false))
      .hideLastName(signal(false))
      .hideLanguageCode(signal(false))
  }

  static builder(): IBuilder<UserFormOptions> {
    return UserFormOptions.initialBuilder()
  }

  public allowedLanguages: WritableSignal<Array<LanguageDto>> = signal([LanguageDto.English])
  public allowedUserRoles: WritableSignal<Array<UserRoleDtoV1>> = signal([])
  public allowedUserStatuses: WritableSignal<Array<UserStatusDtoV1>> = signal([UserStatusDtoV1.Unconfirmed])

  public defaultLanguage: WritableSignal<LanguageDto> = signal(LanguageDto.English)
  public defaultUserRoles: WritableSignal<Array<UserRoleDtoV1>> = signal([])
  public defaultUserStatus: WritableSignal<UserStatusDtoV1> = signal(UserStatusDtoV1.Unconfirmed)

  public readonlyEmail: WritableSignal<boolean> = signal(false)
  public readonlyStatus: WritableSignal<boolean> = signal(false)
  public readonlyRoles: WritableSignal<boolean> = signal(false)
  public readonlyFirstName: WritableSignal<boolean> = signal(false)
  public readonlyLastName: WritableSignal<boolean> = signal(false)
  public readonlyLanguageCode: WritableSignal<boolean> = signal(false)

  public requiredEmail: WritableSignal<boolean> = signal(true)
  public requiredStatus: WritableSignal<boolean> = signal(true)
  public requiredRoles: WritableSignal<boolean> = signal(true)
  public requiredFirstName: WritableSignal<boolean> = signal(true)
  public requiredLastName: WritableSignal<boolean> = signal(true)
  public requiredLanguageCode: WritableSignal<boolean> = signal(true)

  public hideEmail: WritableSignal<boolean> = signal(false)
  public hideStatus: WritableSignal<boolean> = signal(false)
  public hideRoles: WritableSignal<boolean> = signal(false)
  public hideFirstName: WritableSignal<boolean> = signal(false)
  public hideLastName: WritableSignal<boolean> = signal(false)
  public hideLanguageCode: WritableSignal<boolean> = signal(false)

}
