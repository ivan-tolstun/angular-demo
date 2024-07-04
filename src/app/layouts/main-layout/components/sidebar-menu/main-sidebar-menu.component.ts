import {Component, OnInit, SecurityContext, ViewChild, ViewEncapsulation} from '@angular/core'
import {MenuItem} from "primeng/api";
import {TieredMenu} from "primeng/tieredmenu/tieredmenu";
import {MenuItemCommandEvent} from "primeng/api/menuitem";
import {StaticImagePath} from "../../../../core/constants/static-image-path";
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-sidebar-menu',
  templateUrl: './main-sidebar-menu.component.html',
  styleUrls: ['./main-sidebar-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainSidebarMenuComponent implements OnInit {

  @ViewChild('languageSubmenu')
  private languageSubmenu: TieredMenu | undefined = undefined

  protected logoPath: string | undefined = this.remoteImageUrl(StaticImagePath.UtimacoLogoLight) ?? undefined
  protected mainSubmenuItems: MenuItem[] = []
  protected settingsSubmenuItems: MenuItem[] = []
  protected languageSubmenuItems: MenuItem[] = []

  constructor(private readonly router: Router,
              private readonly domSanitizer: DomSanitizer,
              private readonly translateService: TranslateService,
              private readonly keycloakService: KeycloakService) {
  }

  ngOnInit(): void {
    this.initMenuWithCurrentLanguage()
    this.translateService.onLangChange
    this.translateService.onLangChange.subscribe(lang => this.initMenuWithCurrentLanguage())
  }

  private initMenuWithCurrentLanguage(): void {
    this.initMainSubmenuWithCurrentLanguage()
    this.initSettingsSubmenuWithCurrentLanguage()
    this.initLanguageSubmenuWithCurrentLanguage()
  }

  private initMainSubmenuWithCurrentLanguage(): void {
    const fistPageLink = {
      label: this.translateService.instant("mainLayout.sidebarMenu.linkToFistPage"),
      icon: "pi pi-fw pi-apartment-light",
      command: ($event: MenuItemCommandEvent) => { /* TODO: navigateTo */ },
      routerLinkActiveOptions: {exact: true},
      disabled: true,
      visible: true
    }
    const secondPageLink = {
      label: this.translateService.instant("mainLayout.sidebarMenu.linkToSecondPage"),
      icon: "pi pi-fw pi-smb-share-light",
      command: ($event: MenuItemCommandEvent) => { /* TODO: navigateTo */ },
      routerLinkActiveOptions: {exact: true},
      disabled: true,
      visible: true
    }
    this.mainSubmenuItems = [fistPageLink, secondPageLink]
  }

  private initSettingsSubmenuWithCurrentLanguage(): void {
    const languageLink = {
      label: this.translateService.instant("mainLayout.sidebarMenu.language"),
      icon: "pi pi-fw pi-language-light",
      command: () => { this.languageSubmenu?.toggle(true) },
      disabled: false,
      visible: true
    }
    const logoutLink = {
      label: this.translateService.instant("mainLayout.sidebarMenu.logout"),
      icon: "pi pi-fw pi-logout-light",
      command: () => { this.keycloakService.logout() },
      routerLinkActiveOptions: {exact: true},
      disabled: false,
      visible: true
    }
    const userProfileLink = {
      label: this.translateService.instant("mainLayout.sidebarMenu.linkToCurrentUser"),
      icon: "pi pi-fw pi-account-circle-light",
      command: ($event: MenuItemCommandEvent) => { /* TODO: navigateTo */  },
      disabled: false,
      visible: true
    }
    const authorizationSettingsLink = {
      label: this.translateService.instant("mainLayout.sidebarMenu.linkToAuthorizationSettings"),
      icon: "pi pi-fw pi-shield-person-light",
      command: ($event: MenuItemCommandEvent) => { /* TODO: navigateTo */ },
      disabled: false,
      visible: true
    }
    this.settingsSubmenuItems = [userProfileLink, authorizationSettingsLink, languageLink, logoutLink]
  }

  private initLanguageSubmenuWithCurrentLanguage(): void {
    this.languageSubmenuItems = [
      {
        label:   this.translateService.instant("mainLayout.sidebarMenu.back"),
        icon: "pi pi-fw pi-reply-dark",
        command: () => { this.languageSubmenu?.hide() }
      },
      {
        separator: true
      },
      {
        label: this.translateService.instant("common.language.de"),
        icon: "fi fi-de",
        command: () => { this.translateService.resetLang("de")}
      },
      {
        separator: true
      },
      {
        label: this.translateService.instant("common.language.en"),
        icon: "fi fi-gb",
        command: () => { this.translateService.resetLang("en")}
      },
      {
        separator: true
      }
    ]
  }

  protected remoteImageUrl(imageName: string | StaticImagePath): string | null {
    const safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(imageName)
    return this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl)
  }
}
