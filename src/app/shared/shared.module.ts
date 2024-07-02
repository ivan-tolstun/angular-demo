import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserFormComponent} from "./components/users/user-form/user-form.component";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {SkeletonModule} from "primeng/skeleton";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {UserUpdateComponent} from "./components/users/user-update/user-update.component";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    UserFormComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    SkeletonModule,
    DropdownModule,
    MultiSelectModule,
    Button,
    InputTextModule
  ],
  exports: [
    UserFormComponent,
    UserUpdateComponent
  ]
})
export class SharedModule { }
