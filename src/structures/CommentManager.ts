import Client from '@client/Client'

export default class CommentManager {
  public constructor(private client: Client) {}

  /**
   * Fetch comments from a user
   */
  public async fetch(
    data: CommentFetchProps
  ): Promise<Listing<RedditComment, 't1'>> {
    const params = new URLSearchParams({
      sort: 'new',
      t: 'week',
      type: 'comments'
    }).toString()

    return this.client.query<Listing<RedditComment, 't1'>>(
      `/user/${data.username}/comments?${params}`
    )
  }

  /**
   * Distinguish a comment with a sigil or sticky
   */
  public async distinguish(
    data: CommentDistinguishProps
  ): Promise<ActionResponse<CommentData>> {
    return this.client.query('/api/distinguish', {
      method: 'POST',
      body: Object.assign({ api_type: 'json' }, data)
    })
  }

  /**
   * Create a comment
   */
  public async create(
    data: CommentProps
  ): Promise<ActionResponse<CommentData>> {
    const res = await this.client.query<ActionResponse<CommentData>>(
      '/api/comment',
      {
        method: 'POST',
        body: Object.assign({ api_type: 'json' }, data)
      }
    )

    this.client.emit('commentCreate', data, res)
    return res
  }

  /**
   * Remove a comment
   */
  public async remove(data: RemoveProps): Promise<{}> {
    const res = await this.client.query<{}>('/api/del', {
      method: 'POST',
      body: data
    })

    this.client.emit('commentRemove', res, data)
    return res
  }
}
