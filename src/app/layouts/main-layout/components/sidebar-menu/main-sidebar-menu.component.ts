import {Component, OnInit, SecurityContext, ViewChild, ViewEncapsulation} from '@angular/core'
import {MenuItem} from "primeng/api";
import {TieredMenu} from "primeng/tieredmenu/tieredmenu";
import {MenuItemCommandEvent} from "primeng/api/menuitem";
import {StaticImagePath} from "../../../../core/constants/static-image-path";
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";
import {KeycloakService} from "keycloak-angular";

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

  constructor(private readonly domSanitizer: DomSanitizer,
              private readonly translateService: TranslateService,
              private readonly KeycloakService: KeycloakService) {
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
    const mainSubmenu: Array<MenuItem> = []
    const fistPageLink = {
      label: this.translateService.instant("mainLayout.sidebarMenu.linkToFistPage"),
      icon: "pi pi-fw pi-apartment-light",
      command: ($event: MenuItemCommandEvent) => { /* TODO: navigateTo */ },
      routerLinkActiveOptions: {exact: true},
    }
    mainSubmenu.push(fistPageLink)
    const secondPageLink = {
      label: this.translateService.instant("mainLayout.sidebarMenu.linkToSecondPage"),
      icon: "pi pi-fw pi-smb-share-light",
      command: ($event: MenuItemCommandEvent) => { /* TODO: navigateTo */ },
      routerLinkActiveOptions: {exact: true}
    }
    mainSubmenu.push(secondPageLink)
    this.mainSubmenuItems = mainSubmenu
  }

  private initSettingsSubmenuWithCurrentLanguage(): void {
    const settingsSubmenu: Array<MenuItem> = []
    const languageLink = {
      label: this.translateService.instant("mainLayout.sidebarMenu.language"),
      icon: "pi pi-fw pi-language-light",
      command: () => { this.languageSubmenu?.toggle(true) }
    }
    const logoutLink = {
      label: this.translateService.instant("mainLayout.sidebarMenu.logout"),
      icon: "pi pi-fw pi-logout-light",
      command: () => { this.KeycloakService.logout() },
      routerLinkActiveOptions: {exact: true},
    }
    settingsSubmenu.push(
      {
        label: this.translateService.instant("mainLayout.sidebarMenu.linkToCurrentUser"),
        icon: "pi pi-fw pi-account-circle-light",
        command: ($event: MenuItemCommandEvent) => { /* TODO: navigateTo */ }
      },
      {
        label: this.translateService.instant("mainLayout.sidebarMenu.linkToAuthorizationSettings"),
        icon: "pi pi-fw pi-shield-person-light",
        command: ($event: MenuItemCommandEvent) => { /* TODO: navigateTo */ }
      },
      languageLink, logoutLink)
    this.settingsSubmenuItems = settingsSubmenu
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
