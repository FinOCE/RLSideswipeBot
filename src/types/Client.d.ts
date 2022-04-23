type ClientData = {
  scopes: string[]
}

type QueryData = {
  method?: string
  body?: Record<string, string>
  authorization?: string
  www?: boolean
}
