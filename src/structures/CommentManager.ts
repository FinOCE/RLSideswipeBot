import Client from '@client/Client'
import fetch from 'node-fetch'

export default class CommentManager {
  public constructor(private client: Client) {}

  /**
   * Create a comment
   */
  public async create(
    data: CommentProps
  ): Promise<ActionResponse<CommentData>> {
    // Handle invalid queries
    if (this.client.token === null)
      throw new Error('Client cannot create comments until it is logged in')

    // Submit API query
    const res = await fetch('https://oauth.reddit.com/api/comment', {
      method: 'POST',
      body: new URLSearchParams(Object.assign({ api_type: 'json' }, data)),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': Client.USER_AGENT,
        Authorization: `Bearer ${this.client.token.access_token}`
      }
    }).then(res => res.json())

    this.client.emit('commentCreate', data, res)

    return res
  }

  /**
   * Remove a comment
   */
  public async remove(data: RemoveProps): Promise<{}> {
    // Handle invalid queries
    if (this.client.token === null)
      throw new Error('Client cannot remove comments until it is logged in')

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

    this.client.emit('commentRemove', res, data)

    return res
  }
}
