import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MessageService} from "primeng/api";
import {GlobalMessageService} from "./core/services/global-message-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})

export class AppComponent implements OnInit {

  protected readonly globalToastKey = "global-toast"

  constructor(private readonly messageService: MessageService,
              private readonly translateService: TranslateService,
              private readonly globalMessageService: GlobalMessageService) {
  }

  ngOnInit(): void {
    this.globalMessageService.init(this.messageService, this.globalToastKey)
    this.initLanguageOnPortal()
  }

  public initLanguageOnPortal(): void {
    let lang = localStorage.getItem('language') ?? 'en'
    this.translateService.setDefaultLang(lang)
    this.translateService.use(lang)
  }

}



