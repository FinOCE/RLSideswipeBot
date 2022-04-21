import { EventEmitter } from 'events'
import fetch from 'node-fetch'
import { glob } from 'glob-promise'
import Event from '@structures/Event'
import CommentManager from '@structures/CommentManager'
import PostManager from '@structures/PostManager'

export default class Client extends EventEmitter {
  public static readonly USER_AGENT: string = 'RLSideswipeBot/1.0.0 by SpawnRL'
  public static readonly SELF_SR: string = 'u_RLSideswipeBot'
  public static readonly SCOPES: string[] = [
    'identity',
    'submit',
    'read',
    'edit',
    'modflair',
    'modposts',
    'history'
  ]

  public token: Token | null = null
  public readyAt: Date | null = null
  public user: User | null = null

  public posts: PostManager = new PostManager(this)
  public comments: CommentManager = new CommentManager(this)

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
    // Handle invalid queries
    if (!clientId || !clientSecret) throw new Error('Missing credentials')

    // Authenticate with OAuth
    await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'password',
        username: process.env.REDDIT_USERNAME!,
        password: process.env.REDDIT_PASSWORD!,
        scope: Client.SCOPES.join(' ')
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

        this.token = token
      })

    // Fetch client user information
    if (!this.token) throw new Error('Unable to authenticate client user')

    await fetch('https://oauth.reddit.com/api/v1/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': Client.USER_AGENT,
        Authorization: `Bearer ${this.token.access_token}`
      }
    })
      .then(res => res.json())
      .then((res: User) => (this.user = res))

    this.emit('ready')
  }
}
