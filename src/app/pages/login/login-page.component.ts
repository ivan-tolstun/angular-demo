import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorizationClientService} from "../../core/api/clients/authorization/authorization-client.service";
import {TokenDto} from "../../core/api/dto/authorization/jwt-dto.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {

  protected readonly utimacoLogoBlack = './assets/logos/utimaco-logo-black.svg'
  protected dto: TokenDto | undefined = undefined

  protected loginFormGroup = new FormGroup({
    userEmail: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    userPassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1)
    ]),
  })

  constructor(private readonly router: Router,
              private readonly authClient: AuthorizationClientService) {
  }

  ngOnInit(): void {
  }

  protected login(): void {
    const userEmail = this.loginFormGroup.get("userEmail")?.value
    const userPassword = this.loginFormGroup.get("userPassword")?.value
    if (userEmail != null && userPassword != null) {
      this.authClient
        .login(userEmail, userPassword)
        .subscribe(dto => {
          this.dto = dto
          this.router.navigate(["main"])
        })
    }
  }

  protected loginFormCompleted(): boolean {
    const userEmailValid = this.loginFormGroup.get("userEmail")?.valid ?? false
    const userPasswordValid = this.loginFormGroup.get("userPassword")?.valid ?? false
    return userEmailValid && userPasswordValid
  }

  protected toForgotPasswordPage(): void {

  }

  protected toPublicUserRegistrationPage() {

  }

}
