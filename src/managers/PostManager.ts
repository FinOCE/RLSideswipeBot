import Client from '@client/Client'
import Listing from '@structures/Listing'
import Post from '@structures/Post'

export default class PostManager {
  public constructor(private client: Client) {}

  /**
   * Fetch a post by ID
   */
  public async fetch(ids: Fullname[]): Promise<Listing<RedditPost, Post>> {
    return this.client
      .query<RawListing<RedditPost>>(`/by_id/${ids.join()}`)
      .then(res => new Listing(this.client, res, Post))
  }

  /**
   * Create a post
   */
  public async create(data: PostProps): Promise<Post> {
    // Handle invalid queries
    if (data.kind !== 'self' && !data.url)
      throw new Error('Posts without "self" kind need a url property')

    if (data.url && data.text)
      throw new Error('Posts cannot have both text and a url')

    // Submit API query
    const { name } = await this.client
      .query<ActionResponse<PostData>>('/api/submit', {
        method: 'POST',
        body: Object.assign({ api_type: 'json', resubmit: 'true' }, data)
      })
      .then(res => res.json.data)

    const res = await this.fetch([name])
    const post = res.children[0]

    this.client.emit('postCreate', data, post)
    return post
  }

  /**
   * Approve a post
   */
  public async approve(id: Fullname): Promise<void> {
    await this.client.query<void>('/api/approve', {
      method: 'POST',
      body: { id }
    })

    this.client.emit('postApprove', id)
  }

  /**
   * Update the flair of a post
   */
  public async flair(data: FlairProps): Promise<Post> {
    const res = await this.client
      .query<ActionResponse<PostApproveResponse>>('/api/flair', {
        method: 'POST',
        body: Object.assign({ api_type: 'json' }, data)
      })
      .then(res => res.json.data.things[0].data)
      .then(res => new Post(this.client, res))

    this.client.emit('postFlairUpdate', res)
    return res
  }

  /**
   * Remove a post
   */
  public async remove(id: Fullname, spam: 'true' | 'false'): Promise<void> {
    await this.client.query<{}>('/api/del', {
      method: 'POST',
      body: { id, spam }
    })

    this.client.emit('postRemove', id, spam)
  }
}
