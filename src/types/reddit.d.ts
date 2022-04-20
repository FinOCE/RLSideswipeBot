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

type PostProps = {
  kind: 'self' | 'link' | 'image' | 'video' | 'videogif'
  title: string
  text?: string
  url?: string
  flair_id?: string
  flair_text?: string
  nsfw?: 'true' | 'false'
  spoiler?: 'true' | 'false'
}
