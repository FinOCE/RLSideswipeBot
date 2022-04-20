type Fullname = string

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
  sr: string
  text?: string
  url?: string
  flair_id?: string
  flair_text?: string
  nsfw?: 'true' | 'false'
  spoiler?: 'true' | 'false'
}

type CommentProps = {
  text: string
  thing_id: Fullname
}

type ActionResponse<T> = {
  json: {
    errors: string[]
    data: T
  }
}

type PostData = {
  url: string
  drafts_count: number
  id: string
  name: Fullname
}

type CommentData = {
  things: {
    kind: 't1'
    data: Comment
  }[]
}

type Comment = {
  subreddit_id: Fullname
  parent_id: Fullname
  author_fullname: Fullname
  name: Fullname
  permalink: string
  created: number
  body: string
  ups: number
  downs: number
  removed: boolean
  is_submitter: boolean

  // Unknown or unimportant properties
  approved_at_utc: unknown
  author_is_blocked: boolean
  comment_type: unknown
  edited: boolean
  mod_reason_by: unknown
  banned_by: unknown
  num_reports: number
  author_flair_type: unknown
  total_awards_received: number
  subreddit: string
  author_flair_template_id: unknown
  likes: boolean
  replies: unknown
  user_reports: unknown[]
  saved: boolean
  id: string
  banned_at_utc: unknown
  mod_reason_title: unknown
  gilded: number
  archived: boolean
  collapsed_reason_code: unknown
  no_follow: boolean
  author: string
  can_mod_post: boolean
  created_utc: number
  ignore_reports: boolean
  send_replies: boolean
  score: number
  report_reasons: unknown[]
  approved_by: unknown
  all_awardings: unknown[]
  collapsed: boolean
  awarders: unknown[]
  gildings: unknown
  author_flair_css_class: unknown
  author_patreon_flair: boolean
  author_flair_richtext: unknown[]
  body_html: string
  removal_reason: unknown
  collapsed_reason: unknown
  spam: boolean
  associated_award: unknown
  stickied: boolean
  author_premium: boolean
  can_gild: boolean
  unrepliable_reason: unknown
  approved: boolean
  author_flair_text_color: unknown
  score_hidden: boolean
  subreddit_type: unknown
  locked: boolean
  author_flair_text: unknown
  treatment_tags: unknown[]
  rte_mode: unknown
  link_id: Fullname
  subreddit_name_prefixed: string
  controversiality: number
  top_awarded_type: unknown
  author_flair_background_color: unknown
  collapsed_because_crowd_control: unknown
  mod_reports: unknown[]
  mod_note: unknown
  distinguished: unknown
}
