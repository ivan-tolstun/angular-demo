import {Builder, IBuilder} from "builder-pattern";
import {LanguageDto} from "../common/language-dto";

export class UserDtoV1 {

    static builder(): IBuilder<UserDtoV1> {
        return Builder<UserDtoV1>()
    }

    email: string | undefined
    emailVerified: boolean = false
    status: UserStatusDtoV1 | undefined
    roles: Array<UserRoleDtoV1> | undefined
    firstName: string | undefined
    lastName: string | undefined
    languageCode: LanguageDto | undefined
}

export enum UserRoleDtoV1 {
    Admin = 'ADMIN',
    Manager = 'MANAGER'
}

export enum UserStatusDtoV1 {
    Unconfirmed = 'UNCONFIRMED',
    Confirmed = 'CONFIRMED',
    Archived = 'ARCHIVED',
    ForceChangePassword = 'FORCE_CHANGE_PASSWORD'
}
