import { EventEmitter } from 'events'
import fetch from 'node-fetch'
import { glob } from 'glob-promise'
import Event from '@structures/Event'
import CommentManager from '@managers/CommentManager'
import PostManager from '@managers/PostManager'

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

  /**
   * Submit a query to the Reddit API
   */
  public async query<T>(url: string, data?: QueryData): Promise<T> {
    // Handle invalid queries
    if (this.token === null && !data?.authorization)
      throw new Error('Client cannot submit queries before it is logged in')

    // Submit query
    const res = await fetch(
      `https://${data?.www ? 'www' : 'oauth'}.reddit.com${url}`,
      {
        method: data?.method ? data.method : 'GET',
        body: data?.body ? new URLSearchParams(data.body) : undefined,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': Client.USER_AGENT,
          Authorization: data?.authorization
            ? data.authorization
            : `Bearer ${this.token!.access_token}`
        }
      }
    ).then(res => res.json())

    // Return result of query as the given type
    return res as T
  }

  public async login(clientId: string, clientSecret: string): Promise<void> {
    // Handle invalid queries
    if (!clientId || !clientSecret) throw new Error('Missing credentials')

    // Authenticate with OAuth
    await this.query<Token | APIError>('/api/v1/access_token', {
      www: true,
      method: 'POST',
      body: {
        grant_type: 'password',
        username: process.env.REDDIT_USERNAME!,
        password: process.env.REDDIT_PASSWORD!,
        scope: Client.SCOPES.join(' ')
      },
      authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString('base64')}`
    }).then(token => {
      if ('error' in token)
        throw new Error(`Error ${token.error}: ${token.message}`)

      this.token = token
    })

    // Fetch client user information
    if (!this.token) throw new Error('Unable to authenticate client user')

    this.user = await this.query<User>('/api/v1/me')

    this.readyAt = new Date()
    this.emit('ready')
  }
}
