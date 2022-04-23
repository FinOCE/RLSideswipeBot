import Client from '@client/Client'
import Event from '@structures/Event'
import Post from '@structures/Post'

export default class extends Event {
  public constructor(client: Client) {
    super(client)
  }

  public async run(data: PostProps, res: Post): Promise<void> {
    console.log(`[Post] Created a post ${res.id} on ${data.sr}`)
  }
}
