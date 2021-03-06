import Client from '@client/Client'
import CommentStreamManager from '@managers/CommentStreamManager'
import Comment from '@structures/Comment'
import Listing from '@structures/Listing'

export default class CommentManager {
  public constructor(private client: Client) {}

  /**
   * Stream comments from a given subreddit and handle with a callback
   */
  public stream(
    subreddit: string,
    callback: (comment: Comment) => void | Promise<void>
  ): CommentStreamManager {
    const res = new CommentStreamManager(this.client, subreddit)
    res.start(callback)

    this.client.emit('commentStreamCreate', res)
    return res
  }

  /**
   * Fetch comments from a user or subreddit
   */
  public async fetch(
    data: CommentFetchProps
  ): Promise<Listing<RedditComment, Comment>[]> {
    if ('username' in data) {
      // Search by username
      const params = new URLSearchParams({
        sort: 'new',
        t: 'week',
        type: 'comments'
      }).toString()

      return this.client
        .query<RawListing<RedditComment>>(
          `/user/${data.username}/comments?${params}`
        )
        .then(res => [new Listing(this.client, res, Comment)])
    } else if ('sr' in data) {
      // Search by subreddit or specific post
      return this.client
        .query<RawListing<RedditComment>[]>(
          `/r/${data.sr}/comments/${data.postId ?? ''}`
        )
        .then(res =>
          Array.isArray(res)
            ? res.map(l => new Listing(this.client, l, Comment))
            : [new Listing(this.client, res, Comment)]
        )
    } else
      throw new Error(
        'Neither a username nor subreddit were provided to fetch comments from'
      )
  }

  /**
   * Edit a comment
   */
  public async edit(data: CommentProps): Promise<Comment> {
    const res = await this.client
      .query<ActionResponse<CommentData>>('/api/editusertext', {
        method: 'POST',
        body: Object.assign({ api_type: 'json' }, data)
      })
      .then(res => res.json.data.things[0].data)
      .then(res => new Comment(this.client, res))

    this.client.emit('commentEdit', data)
    return res
  }

  /**
   * Distinguish a comment with a sigil or sticky
   */
  public async distinguish(data: CommentDistinguishProps): Promise<Comment> {
    const res = await this.client
      .query<ActionResponse<CommentData>>('/api/distinguish', {
        method: 'POST',
        body: Object.assign({ api_type: 'json' }, data)
      })
      .then(res => res.json.data.things[0].data)
      .then(res => new Comment(this.client, res))

    this.client.emit('commentDistinguish', res)
    return res
  }

  /**
   * Approve a comment
   */
  public async approve(id: Fullname): Promise<void> {
    await this.client.query<void>('/api/approve', {
      method: 'POST',
      body: { id }
    })

    this.client.emit('commentApprove', id)
  }

  /**
   * Create a comment
   */
  public async create(data: CommentProps): Promise<Comment> {
    const res = await this.client
      .query<ActionResponse<CommentData>>('/api/comment', {
        method: 'POST',
        body: Object.assign({ api_type: 'json' }, data)
      })
      .then(res => {
        return res.json.data.things[0].data
      })
      .then(res => new Comment(this.client, res))

    this.client.emit('commentCreate', data, res)
    return res
  }

  /**
   * Remove a comment
   */
  public async remove(id: Fullname, spam: 'true' | 'false'): Promise<void> {
    await this.client.query<{}>('/api/del', {
      method: 'POST',
      body: { id, spam }
    })

    this.client.emit('commentRemove', id, spam)
  }
}
