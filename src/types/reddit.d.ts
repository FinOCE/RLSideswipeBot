type APIError = {
  message: string
  error: number
}

type Token = {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
}
