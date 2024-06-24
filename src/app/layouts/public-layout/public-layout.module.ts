import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ToolbarModule} from 'primeng/toolbar'
import {RippleModule} from 'primeng/ripple'
import {ButtonModule} from 'primeng/button'
import {OverlayPanelModule} from 'primeng/overlaypanel'
import {DialogModule} from 'primeng/dialog'
import {AvatarModule} from 'primeng/avatar'
import {AvatarGroupModule} from 'primeng/avatargroup'
import {BadgeModule} from 'primeng/badge'
import {SharedModule} from "../../shared/shared.module"
import {PublicLayoutComponent} from "./public-layout.component"
import {DividerModule} from "primeng/divider"
import {RouterModule} from "@angular/router"
import {PublicTopMenuComponent} from "./components/top-menu/public-top-menu.component"
import {ScrollPanelModule} from "primeng/scrollpanel";
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";

@NgModule({
    declarations: [
        PublicLayoutComponent,
        PublicTopMenuComponent
    ],
    exports: [
        PublicLayoutComponent,
        PublicTopMenuComponent
    ],
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
        DividerModule,
        RouterModule,
        ScrollPanelModule,
        CardModule,
        ImageModule
    ]
})
export class PublicLayoutModule {}
