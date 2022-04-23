type Fullname = string

type TypePrefix = 't1' | 't2' | 't3' | 't4' | 't5' | 't6'
type TypeName =
  | 'COMMENT'
  | 'ACCOUNT'
  | 'LINK'
  | 'MESSAGE'
  | 'SUBREDDIT'
  | 'AWARD'

type APIError = {
  message: string
  error: number
}

type ActionResponse<T> = {
  json: {
    errors: string[]
    data: T
  }
}

type RawListing<T> = {
  kind: 'Listing'
  data: {
    after?: Fullname
    before?: Fullname
    dist: number
    modhash: null
    geo_filter: ''
    children: {
      kind: TypePrefix
      data: T
    }[]
  }
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

type PostData = {
  url: string
  drafts_count: number
  id: string
  name: Fullname
}

type PostApproveResponse = {
  things: {
    kind: 't3'
    data: RedditPost
  }[]
}

type CommentProps = {
  text: string
  thing_id: Fullname
}

type CommentData = {
  things: {
    kind: 't1'
    data: RedditComment
  }[]
}

type CommentFetchProps =
  | {
      username: string
    }
  | {
      sr: string
    }

type CommentDistinguishProps = {
  how: 'yes' | 'no' | 'admin' | 'special'
  id: Fullname
  sticky: 'true' | 'false'
}

type FlairProps = {
  link: Fullname
  css_class: string
  text: string
}

type RemoveProps = {
  id: string
  spam: 'true' | 'false'
}

type RedditComment = {
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
  author_flair_text: string | null

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

type RedditPost = {
  author_flair_background_color: string | null
  approved_at_utc: number | null
  subreddit: string
  selftext: string
  author_fullname: Fullname
  saved: boolean
  mod_reason_title: string | null
  gilded: number
  clicked: boolean
  title: string
  link_flair_richtext: string[]
  subreddit_name_prefixed: string
  hidden: boolean
  pwls: number | null
  link_flair_css_class: string | null
  downs: number
  thumbnail_height: number | null
  top_awarded_type: string | null
  hide_score: boolean
  name: Fullname
  quarantine: boolean
  link_flair_text_color: string
  upvote_ratio: number
  ignore_reports: boolean
  ups: number
  domain: string
  media_embed: unknown
  thumbnail_width: number | null
  author_flair_template_id: string | null
  is_original_content: boolean
  user_reports: unknown[]
  secure_media: unknown
  is_reddit_media_domain: boolean
  is_meta: boolean
  category: unknown
  secure_media_embed: unknown
  link_flair_text: string | null
  can_mod_post: boolean
  score: number
  approved_by: string | null
  is_created_from_ads_ui: boolean
  author_premium: boolean
  thumbnail: string
  edited: boolean
  author_flair_css_class: string | null
  author_flair_richtext: unknown[]
  gildings: unknown
  content_categories: unknown
  is_self: boolean
  subreddit_type: string
  created: number
  link_flair_type: string
  wls: number | null
  removed_by_category: string | null
  banned_by: string | null
  author_flair_type: string
  total_awards_received: number
  allow_live_comments: boolean
  selftext_html: string
  likes: boolean
  suggested_sort: string
  banned_at_utc: number | null
  view_count: number | null
  archived: boolean
  no_follow: boolean
  spam: boolean
  is_crosspostable: boolean
  pinned: boolean
  over_18: boolean
  all_awardings: unknown[]
  awarders: unknown[]
  media_only: boolean
  can_gild: boolean
  removed: boolean
  spoiler: boolean
  locked: boolean
  author_flair_text: string | null
  treatment_tags: unknown[]
  rte_mode: string
  visited: boolean
  removed_by: string | null
  mod_note: string | null
  distinguished: unknown
  subreddit_id: Fullname
  author_is_blocked: boolean
  mod_reason_by: string | null
  num_reports: number
  removal_reason: string | null
  link_flair_background_color: string
  id: string
  is_robot_indexable: boolean
  report_reasons: unknown[]
  author: string
  discussion_type: unknown
  num_comments: number
  send_replies: boolean
  whitelist_status: unknown
  contest_mode: boolean
  mod_reports: unknown[]
  author_patreon_flair: boolean
  approved: boolean
  author_flair_text_color: string | null
  permalink: string
  parent_whitelist_status: unknown
  stickied: boolean
  url: string
  subreddit_subscribers: number
  created_utc: number
  num_crossposts: number
  media: unknown
  is_video: boolean
}

type User = {
  name: string
  created: number
  total_karma: number
  subreddit: Subreddit

  // Unknown or unimportant properties
  is_employee: boolean
  seen_layout_switch: boolean
  has_visited_new_profile: boolean
  pref_no_profanity: boolean
  has_external_account: boolean
  pref_geopopular: unknown
  seen_redesign_modal: boolean
  pref_show_trending: boolean
  pref_show_presence: boolean
  snoovatar_img: unknown
  snoovatar_size: unknown
  gold_expiration: unknown
  has_gold_subscription: boolean
  is_sponsor: boolean
  num_friends: number
  features: {
    mod_service_mute_writes: boolean
    promoted_trend_blanks: boolean
    show_amp_link: boolean
    is_email_permission_required: boolean
    mod_awards: boolean
    expensive_coins_package: boolean
    chat_subreddit: boolean
    awards_on_streams: boolean
    mweb_xpromo_modal_listing_click_daily_dismissible_ios: boolean
    cookie_consent_banner: boolean
    modlog_copyright_removal: boolean
    do_not_track: boolean
    mod_service_mute_reads: boolean
    chat_user_settings: boolean
    use_pref_account_deployment: boolean
    mweb_xpromo_interstitial_comments_ios: boolean
    mweb_sharing_clipboard: {
      owner: unknown
      variant: unknown
      experiment_id: number
    }
    premium_subscriptions_table: boolean
    mweb_xpromo_interstitial_comments_android: boolean
    crowd_control_for_post: boolean
    mweb_xpromo_modal_listing_click_daily_dismissible_android: boolean
    chat_group_rollout: boolean
    resized_styles_images: boolean
    spez_modal: boolean
    noreferrer_to_noopener: boolean
  }
  can_edit_name: boolean
  verified: boolean
  pref_autoplay: boolean
  coins: number
  has_paypal_subscription: boolean
  has_subscribed_to_premium: boolean
  id: string
  has_stripe_subscription: boolean
  oauth_client_id: string
  can_create_subreddit: boolean
  over_18: boolean
  is_gold: boolean
  is_mod: boolean
  awarder_karma: number
  suspension_expiration_utc: unknown
  has_verified_email: boolean
  is_suspended: boolean
  pref_video_autoplay: boolean
  has_android_subscription: boolean
  in_redesign_beta: boolean
  icon_img: string
  pref_nightmode: boolean
  awardee_karma: number
  hide_from_robots: boolean
  password_set: boolean
  link_karma: number
  force_password_reset: boolean
  seen_give_award_tooltip: boolean
  inbox_count: number
  seen_premium_adblock_modal: boolean
  pref_top_karma_subreddits: boolean
  pref_show_snoovatar: boolean
  pref_clickgadget: number
  gold_creddits: number
  created_utc: number
  has_ios_subscription: boolean
  pref_show_twitter: boolean
  in_beta: boolean
  comment_karma: number
  accept_followers: boolean
  has_subscribed: boolean
  linked_identities: unknown[]
  seen_subreddit_chat_ftux: boolean
}

type Subreddit = {
  name: Fullname
  display_name: string
  description: string
  subscribers: number
  url: string

  // Unknown or unimportant properties
  default_set: boolean
  user_is_contributor: boolean
  banner_img: string
  restrict_posting: boolean
  user_is_banned: boolean
  free_form_reports: boolean
  community_icon: unknown
  show_media: boolean
  icon_color: unknown
  user_is_muted: boolean
  header_img: unknown
  title: string
  coins: number
  previous_names: unknown[]
  over_18: boolean
  icon_size: [number, number]
  primary_color: unknown
  icon_img: string
  submit_link_label: string
  header_size: unknown
  restrict_commenting: boolean
  submit_text_label: string
  is_default_icon: boolean
  link_flair_position: unknown
  display_name_prefixed: string
  key_color: unknown
  is_default_banner: boolean
  quarantine: boolean
  banner_size: unknown
  user_is_moderator: boolean
  accept_followers: boolean
  public_description: string
  link_flair_enabled: boolean
  disable_contributor_requests: boolean
  subreddit_type: string
  user_is_subscriber: boolean
}
