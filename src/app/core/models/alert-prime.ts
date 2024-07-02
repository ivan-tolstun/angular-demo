import {Builder, IBuilder} from "builder-pattern";

export class AlertPrime {

  static builder(): IBuilder<AlertPrime> {
    return Builder<AlertPrime>().life(10000)
  }

  static successBuilder(): IBuilder<AlertPrime> {
    return Builder<AlertPrime>().life(10000).severity(AlertTypePrime.Success)
  }

  static errorBuilder(): IBuilder<AlertPrime> {
    return Builder<AlertPrime>().life(10000).severity(AlertTypePrime.Error)
  }

  static infoBuilder(): IBuilder<AlertPrime> {
    return Builder<AlertPrime>().life(10000).severity(AlertTypePrime.Info)
  }

  static warnBuilder(): IBuilder<AlertPrime> {
    return Builder<AlertPrime>().life(10000).severity(AlertTypePrime.Warn)
  }

  key?: string
  severity: AlertTypePrime = AlertTypePrime.Info
  summary: string = ""
  detail: string = ""
  life: number = 10000
}

export enum AlertTypePrime {
  Success = 'success',
  Info = 'info',
  Warn = 'warn',
  Error = 'error'
}

