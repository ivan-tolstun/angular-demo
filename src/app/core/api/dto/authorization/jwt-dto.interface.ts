export interface TokenDto {
  access_token: string
  refresh_token: string
  expires_in: number
  refresh_expires_in: number
  token_type: string
}

export interface AccessTokenDto {
  email: string
  email_verified: boolean,
  name: string
  given_name: string
  family_name: string
}
