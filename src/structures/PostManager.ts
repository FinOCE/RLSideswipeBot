import Client from '@client/Client'
import fetch from 'node-fetch'

export default class PostManager {
  public constructor(private client: Client) {}

  /**
   * Create a post
   */
  public async create(data: PostProps): Promise<ActionResponse<PostData>> {
    // Handle invalid queries
    if (this.client.token === null)
      throw new Error('Client cannot post until it is logged in')

    if (data.kind !== 'self' && !data.url)
      throw new Error('Posts without "self" kind need a url property')

    if (data.url && data.text)
      throw new Error('Posts cannot have both text and a url')

    // Submit API query
    const res = await fetch('https://oauth.reddit.com/api/submit', {
      method: 'POST',
      body: new URLSearchParams(
        Object.assign({ api_type: 'json', resubmit: 'true' }, data)
      ),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': Client.USER_AGENT,
        Authorization: `Bearer ${this.client.token.access_token}`
      }
    }).then(res => res.json())

    this.client.emit('postCreate', data, res)

    return res
  }

  /**
   * Remove a comment
   */
  public async remove(data: RemoveProps): Promise<{}> {
    // Handle invalid queries
    if (this.client.token === null)
      throw new Error('Client cannot remove posts until it is logged in')

    // Submit API query
    const res = await fetch('https://oauth.reddit.com/api/del', {
      method: 'POST',
      body: new URLSearchParams(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': Client.USER_AGENT,
        Authorization: `Bearer ${this.client.token.access_token}`
      }
    }).then(res => res.json())

    this.client.emit('postRemove', data, res)

    return res
  }
}
