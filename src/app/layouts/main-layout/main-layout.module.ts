import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ToolbarModule} from 'primeng/toolbar'
import {RippleModule} from 'primeng/ripple'
import {ButtonModule} from 'primeng/button'
import {MainSidebarMenuComponent} from './components/sidebar-menu/main-sidebar-menu.component'
import {MainTopMenuComponent} from './components/top-menu/main-top-menu.component'
import {OverlayPanelModule} from 'primeng/overlaypanel'
import {DialogModule} from 'primeng/dialog'
import {AvatarModule} from 'primeng/avatar'
import {AvatarGroupModule} from 'primeng/avatargroup'
import {BadgeModule} from 'primeng/badge'
import {SharedModule} from "../../shared/shared.module"
import {MainLayoutComponent} from "./main-layout.component"
import {RouterModule} from "@angular/router"
import {ImageModule} from "primeng/image"
import {ScrollPanelModule} from "primeng/scrollpanel";
import {PanelMenuModule} from "primeng/panelmenu";
import {TieredMenuModule} from "primeng/tieredmenu";
import {CardModule} from "primeng/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatNavList} from "@angular/material/list";

@NgModule({
    declarations: [
        MainLayoutComponent,
        MainSidebarMenuComponent,
        MainTopMenuComponent
    ],
    exports: [],
  imports: [
    CommonModule,
    ToolbarModule,
    RippleModule,
    ButtonModule,
    SharedModule,
    OverlayPanelModule,
    DialogModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    RouterModule,
    ImageModule,
    ScrollPanelModule,
    PanelMenuModule,
    TieredMenuModule,
    CardModule,
    TranslateModule,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
  ]
})
export class MainLayoutModule {}
