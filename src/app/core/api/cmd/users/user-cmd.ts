import {Builder, IBuilder} from "builder-pattern";
import {UserRoleDtoV1, UserStatusDtoV1} from "../../dto/users/user-dto";

export class GetUserCmdV1 {

    static builder(): IBuilder<GetUserCmdV1> {
        return Builder<GetUserCmdV1>()
    }

    userEmail: string = ""
}

export class GetUsersCmdV1 {

    static builder(): IBuilder<GetUsersCmdV1> {
        return Builder<GetUsersCmdV1>()
    }

    withEmails: Array<string> | undefined
    withoutEmails: Array<string> | undefined
    withStatuses: Array<UserStatusDtoV1> | undefined
    withoutStatuses: Array<UserStatusDtoV1> | undefined
    withRoles: Array<UserRoleDtoV1> | undefined
    withoutRoles: Array<UserRoleDtoV1> | undefined
    globalSearch: string | undefined
    offset: number | undefined
    limit: number | undefined
}

export class CountUsersCmdV1 {

    static builder(): IBuilder<CountUsersCmdV1> {
        return Builder<CountUsersCmdV1>()
    }

    withEmails: Array<string> | undefined
    withoutEmails: Array<string> | undefined
    withStatuses: Array<UserStatusDtoV1> | undefined
    withoutStatuses: Array<UserStatusDtoV1> | undefined
    withRoles: Array<UserRoleDtoV1> | undefined
    withoutRoles: Array<UserRoleDtoV1> | undefined
    globalSearch: string | undefined
}

export class CreateUserCmdV1 {

    static builder(): IBuilder<CreateUserCmdV1> {
        return Builder<CreateUserCmdV1>()
    }

    userEmail: string = ""
    password: string | undefined
    roles: Array<UserRoleDtoV1> = []
    status: UserStatusDtoV1 = UserStatusDtoV1.Unconfirmed
    firstName: string | undefined
    lastName: string | undefined
    languageCode: string | undefined
}

export class UpdateUserCmdV1 {

    static builder(): IBuilder<UpdateUserCmdV1> {
        return Builder<UpdateUserCmdV1>()
    }

    userEmail: string = ""
    newRoles: Array<UserRoleDtoV1> | undefined
    newStatus: UserStatusDtoV1 | undefined
    newFirstName: string | undefined
    newLastName: string | undefined
    newLanguageCode: string | undefined
}

export class DeleteUserCmdV1 {

    static builder(): IBuilder<DeleteUserCmdV1> {
        return Builder<DeleteUserCmdV1>()
    }

    userEmail: string = ""
}
