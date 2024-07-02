export class PortalRegex {

    static readonly organizationNameValidator =
        new RegExp('^[a-zA-Z0-9]+$')

    static readonly passwordValidator =
        new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')

    static readonly emailValidator =
        new RegExp(/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/)

}