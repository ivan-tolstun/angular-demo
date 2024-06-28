import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private readonly translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.initLanguageOnPortal()
  }

  public initLanguageOnPortal(): void {
    let lang = localStorage.getItem('language') ?? 'en'
    this.translateService.setDefaultLang(lang)
    this.translateService.use(lang)
  }

}



