import Client from '@client/Client'
import Post from '@structures/Post'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)
  }

  public async run(res: Post): Promise<void> {
    console.log(`[Post] Updated the flair on post ${res.id}`)
  }
}
