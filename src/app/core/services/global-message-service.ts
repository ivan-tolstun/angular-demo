import {MessageService} from "primeng/api";
import {AlertPrime, AlertTypePrime} from "../models/alert-prime";
import {Inject, Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalMessageService {

  private messageService: MessageService | undefined
  private globalToastKey: string | undefined

  constructor(@Inject(TranslateService) private readonly translateService: TranslateService) {
  }

  public init(messageService: MessageService | undefined,
              globalToastKey: string): GlobalMessageService {
    this.messageService = messageService
    this.globalToastKey = globalToastKey
    return this
  }

  public showInfo(summary: string | undefined = undefined,
                  detail: string | undefined = undefined,
                  key: string = this.globalToastKey ?? "",
                  life: number | undefined = undefined): void {
    const translatedSummary = (summary != null) ? this.translateService.instant(summary) : ""
    const translatedDetail = (detail != null) ? this.translateService.instant(detail) : ""
    if ((translatedSummary != null && translatedSummary.length > 0)
      || (translatedDetail != null && translatedDetail.length > 0)) {
      console.info(translatedSummary + ": " + translatedDetail)
      this.messageService?.add(
        AlertPrime.builder()
          .key(key)
          .severity(AlertTypePrime.Info)
          .summary(translatedSummary)
          .detail(translatedDetail)
          .life(life ?? 10000)
          .build()
      )
    }
  }

  public showError(summary: string | undefined = undefined,
                   detail: string | undefined = undefined,
                   key: string = this.globalToastKey ?? "",
                   life: number | undefined = undefined): void {
    const translatedSummary = (summary != null) ? this.translateService.instant(summary) : ""
    const translatedDetail = (detail != null) ? this.translateService.instant(detail) : ""
    if ((translatedSummary != null && translatedSummary.length > 0)
      || (translatedDetail != null && translatedDetail.length > 0)) {
      console.error(translatedSummary + ": " + translatedDetail)
      this.messageService?.add(
        AlertPrime.builder()
          .key(key)
          .severity(AlertTypePrime.Error)
          .summary(translatedSummary)
          .detail(translatedDetail)
          .life(life ?? 10000)
          .build()
      )
    }
  }

}
