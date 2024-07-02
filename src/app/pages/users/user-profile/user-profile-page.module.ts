import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatIconModule} from "@angular/material/icon"
import {OverlayPanelModule} from "primeng/overlaypanel"
import {TranslateModule} from "@ngx-translate/core"
import {CardModule} from "primeng/card"
import {ButtonModule} from "primeng/button"
import {DividerModule} from "primeng/divider"
import {InputTextModule} from "primeng/inputtext"
import {ImageModule} from "primeng/image"
import {SharedModule} from "../../../shared/shared.module"
import {PasswordModule} from "primeng/password"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {InputMaskModule} from "primeng/inputmask"
import {CheckboxModule} from "primeng/checkbox"
import {DropdownModule} from "primeng/dropdown"
import {ProgressBarModule} from "primeng/progressbar"
import {RippleModule} from "primeng/ripple"
import {RouterModule} from "@angular/router";
import {ToastModule} from "primeng/toast"
import {UserProfilePageComponent} from "./user-profile-page.component"
import {AccordionModule} from "primeng/accordion"
import {MultiSelectModule} from "primeng/multiselect"
import {SkeletonModule} from "primeng/skeleton"
import {FileUploadModule} from "primeng/fileupload"
import {TableModule} from "primeng/table"
import {StepsModule} from "primeng/steps"
import {FieldsetModule} from "primeng/fieldset"
import {TagModule} from "primeng/tag"
import {AvatarModule} from "primeng/avatar"
import {BadgeModule} from "primeng/badge"
import {ScrollPanelModule} from "primeng/scrollpanel";
import {ChipModule} from "primeng/chip";

@NgModule({
    declarations: [
        UserProfilePageComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        OverlayPanelModule,
        TranslateModule,
        CardModule,
        ButtonModule,
        DividerModule,
        InputTextModule,
        ImageModule,
        PasswordModule,
        FormsModule,
        InputMaskModule,
        SharedModule,
        CheckboxModule,
        ReactiveFormsModule,
        DropdownModule,
        ProgressBarModule,
        RippleModule,
        RouterModule,
        ToastModule,
        AccordionModule,
        MultiSelectModule,
        SkeletonModule,
        FileUploadModule,
        StepsModule,
        FieldsetModule,
        TableModule,
        TagModule,
        AvatarModule,
        BadgeModule,
        ScrollPanelModule,
        ChipModule
    ],
    exports: [
        UserProfilePageComponent
    ]
})
export class UserProfilePageModule {}
