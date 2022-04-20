import { EventEmitter } from 'events'
import fetch from 'node-fetch'
import { glob } from 'glob-promise'
import Event from '@structures/Event'

export default class Client extends EventEmitter {
  public static readonly USER_AGENT: string = 'RLSideswipeBot/1.0.0 by SpawnRL'
  public static readonly SELF_SR: string = 'u_RLSideswipeBot'

  private _token: Token | null = null
  public readyAt: Date | null = null
  public user: any | null = null

  public constructor() {
    super()

    // Map events to the EventEmitter
    glob('*', { cwd: './src/client/events' }, (err, files) => {
      if (err) throw new Error('Unable to map events to client')

      files
        .map(file => file.replace('.ts', ''))
        .forEach(file => {
          const event: Event = new (require(`./events/${file}`).default)(this)
          this[event.method](file, (...args) => event.run(...args))
        })
    })
  }

  get uptime(): number | null {
    return this.readyAt ? Date.now() - this.readyAt.getTime() : null
  }

  get readyTimestamp(): number | null {
    return this.readyAt?.getTime() ?? null
  }

  public async login(clientId: string, clientSecret: string) {
    if (!clientId || !clientSecret) throw new Error('Missing credentials')

    await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'password',
        username: process.env.REDDIT_USERNAME!,
        password: process.env.REDDIT_PASSWORD!,
        scope: 'submit'
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': Client.USER_AGENT,
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString('base64')}`
      }
    })
      .then(res => res.json())
      .then((token: Token | APIError) => {
        if ('error' in token)
          throw new Error(`Error ${token.error}: ${token.message}`)

        this._token = token
      })

    this.emit('ready')
  }

  public async post(data: PostProps): Promise<ActionResponse<CommentData>> {
    if (this._token === null)
      throw new Error('Client cannot post until it is logged in')

    if (data.kind !== 'self' && !data.url)
      throw new Error('Posts without "self" kind need a url property')

    if (data.url && data.text)
      throw new Error('Posts cannot have both text and a url')

    const res = await fetch('https://oauth.reddit.com/api/submit', {
      method: 'POST',
      body: new URLSearchParams(
        Object.assign({ api_type: 'json', resubmit: 'true' }, data)
      ),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': Client.USER_AGENT,
        Authorization: `Bearer ${this._token.access_token}`
      }
    }).then(res => res.json())

    console.log(`[Post] Created a post on ${data.sr}`)

    return res
  }

  public async comment(
    data: CommentProps
  ): Promise<ActionResponse<CommentData>> {
    if (this._token === null)
      throw new Error('Client cannot post until it is logged in')

    const res = await fetch('https://oauth.reddit.com/api/comment', {
      method: 'POST',
      body: new URLSearchParams(Object.assign({ api_type: 'json' }, data)),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': Client.USER_AGENT,
        Authorization: `Bearer ${this._token.access_token}`
      }
    }).then(res => res.json())

    console.log(`[Comment] Created a comment on ${data.thing_id}`)

    return res
  }
}
