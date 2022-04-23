import Client from '@client/Client'
import CommentStreamManager from '@managers/CommentStreamManager'
import Listing from '@structures/Listing'

export default class CommentManager {
  public constructor(private client: Client) {}

  /**
   * Stream comments from a given subreddit and handle with a callback
   */
  public stream(
    subreddit: string,
    callback: (comment: RedditComment) => void | Promise<void>
  ): CommentStreamManager {
    const stream = new CommentStreamManager(this.client, subreddit)
    stream.start(callback)
    return stream
  }

  /**
   * Fetch comments from a user or subreddit
   */
  public async fetch(
    data: CommentFetchProps
  ): Promise<Listing<RedditComment, 't1'>> {
    if ('username' in data) {
      // Search by username
      const params = new URLSearchParams({
        sort: 'new',
        t: 'week',
        type: 'comments'
      }).toString()

      return this.client
        .query<RawListing<RedditComment, 't1'>>(
          `/user/${data.username}/comments?${params}`
        )
        .then(res => new Listing(res))
    } else if ('sr' in data) {
      // Search by subreddit
      return this.client
        .query<RawListing<RedditComment, 't1'>>(`/r/${data.sr}/comments`)
        .then(res => new Listing(res))
    } else
      throw new Error(
        'Neither a username nor subreddit were provided to fetch comments from'
      )
  }

  /**
   * Distinguish a comment with a sigil or sticky
   */
  public async distinguish(
    data: CommentDistinguishProps
  ): Promise<RedditComment> {
    return this.client
      .query<ActionResponse<CommentData>>('/api/distinguish', {
        method: 'POST',
        body: Object.assign({ api_type: 'json' }, data)
      })
      .then(res => res.json.data.things[0].data)
  }

  /**
   * Create a comment
   */
  public async create(data: CommentProps): Promise<RedditComment> {
    const res = await this.client
      .query<ActionResponse<CommentData>>('/api/comment', {
        method: 'POST',
        body: Object.assign({ api_type: 'json' }, data)
      })
      .then(res => res.json.data.things[0].data)

    this.client.emit('commentCreate', data, res)
    return res
  }

  /**
   * Remove a comment
   */
  public async remove(data: RemoveProps): Promise<void> {
    await this.client.query<{}>('/api/del', {
      method: 'POST',
      body: data
    })

    this.client.emit('commentRemove', data)
  }
}
