import Client from '@client/Client'

export default class PostManager {
  public constructor(private client: Client) {}

  /**
   * Create a post
   */
  public async create(data: PostProps): Promise<ActionResponse<PostData>> {
    // Handle invalid queries
    if (data.kind !== 'self' && !data.url)
      throw new Error('Posts without "self" kind need a url property')

    if (data.url && data.text)
      throw new Error('Posts cannot have both text and a url')

    // Submit API query
    const res = await this.client.query<ActionResponse<PostData>>(
      '/api/submit',
      {
        method: 'POST',
        body: Object.assign({ api_type: 'json', resubmit: 'true' }, data)
      }
    )

    this.client.emit('postCreate', data, res)
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

    this.client.emit('postRemove', data, res)
    return res
  }
}
