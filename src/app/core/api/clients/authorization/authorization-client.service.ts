import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core'
import { HttpClient, HttpHeaders } from "@angular/common/http"
import {map, Observable} from "rxjs"
import {TokenDto} from "../../dto/authorization/jwt-dto"
import {JwtHelperService} from "@auth0/angular-jwt"
import {environment} from "../../../../../environments/environment"
import {AesUtil} from "../../../util/aes-util"

@Injectable({
  providedIn: 'root'
})
export class AuthorizationClientService {

  private readonly STORAGE_TOKEN_FIELD_NAME: string = 'TOKEN'

  private realm = environment.keycloakRealm
  private clientId = environment.keycloakClientId
  private clientSecret = environment.keycloakClientSecret
  private grantTypeToGetToken = "password"
  private grantTypeToRefreshToken = "refresh_token"
  private $currentToken: WritableSignal<TokenDto | undefined> = signal(undefined)
  private jwtHelper: JwtHelperService = new JwtHelperService()

  constructor(private http: HttpClient) {
  }

  public authenticated(): Observable<boolean> {
    const currentToken = this.$currentToken() ?? this.findTokenInStorage()
    if (currentToken == null) return new Observable((observer) => {
      observer.next(false); observer.complete() })
    const accessToken = currentToken.access_token
    const refreshToken = currentToken.refresh_token
    if (accessToken == null || refreshToken == null)
      return new Observable((observer) => {
        observer.next(false); observer.complete() })
    return !this.isCurrentAccessTokenExpired()
      ? new Observable((observer) => { observer.next(true); observer.complete() })
      : !this.isCurrentRefreshTokenExpired()
        ? this.refreshToken(refreshToken)
          .pipe(map(token => token.access_token != null && token.refresh_token != null))
        : new Observable((observer) => { observer.next(false); observer.complete() })
  }

  public isCurrentAccessTokenExpired(): boolean {
    const token = this.$currentToken()?.access_token
    return (token != null)
      ? this.jwtHelper.isTokenExpired(token)
      : true
  }

  public isCurrentRefreshTokenExpired(): boolean {
    const token = this.$currentToken()?.refresh_token
    return (token != null)
      ? this.jwtHelper.isTokenExpired(token)
      : true
  }

  public accessCurrentToken(): Observable<string | undefined> {
    return this.authenticated()
      .pipe(map(authenticated => {
        return authenticated
          ? this.$currentToken()?.access_token
          : undefined
      }))
  }

  public login(email: string,
               password: string): Observable<TokenDto> {
    const url = `/realms/${this.realm}/protocol/openid-connect/token`
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    })
    const body = new URLSearchParams();
    body.set("client_id", this.clientId)
    body.set("client_secret", this.clientSecret)
    body.set("username", email)
    body.set("password", password)
    body.set("grant_type", this.grantTypeToGetToken)
    return this.http
      .post<TokenDto>(url, body, {headers})
      .pipe(map(token => {
        this.$currentToken.set(token)
        this.saveTokenInStorage(token)
        return token
      }))
  }

  public refreshToken(refreshToken: string): Observable<TokenDto> {
    const url = `/realms/${this.realm}/protocol/openid-connect/token`
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    })
    const body = new URLSearchParams()
    body.set("client_id", this.clientId)
    body.set("client_secret", this.clientSecret)
    body.set("refresh_token", refreshToken)
    body.set("grant_type", this.grantTypeToRefreshToken)
    return this.http
      .post<TokenDto>(url, body, {headers})
      .pipe(map(token => {
        this.$currentToken.set(token)
        this.saveTokenInStorage(token)
        return token
      }))
  }

  protected findTokenInStorage(): TokenDto | null {
    const encryptedToken = window.sessionStorage.getItem(this.STORAGE_TOKEN_FIELD_NAME)
    return encryptedToken != null
      ? JSON.parse(this.decryptAes(encryptedToken)) as TokenDto
      : null
  }

  protected saveTokenInStorage(token: TokenDto): void {
    window.sessionStorage.setItem(this.STORAGE_TOKEN_FIELD_NAME, this.encryptAes(JSON.stringify(token)))
  }

  protected removeTokenFromStorage(): void {
    window.sessionStorage.removeItem(this.STORAGE_TOKEN_FIELD_NAME)
  }

  private encryptAes(data: string): string {
    return AesUtil.encrypt(data, environment.storageSecretKey)
  }

  private decryptAes(encryptedData: string): string {
    return AesUtil.decrypt(encryptedData, environment.storageSecretKey)
  }

}
