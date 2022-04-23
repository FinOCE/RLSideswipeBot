import Client from '@client/Client'
import CommentStreamManager from '@managers/CommentStreamManager'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)
  }

  public async run(res: CommentStreamManager): Promise<void> {
    console.log(`[Comment] Created comment stream for ${res.subreddit}`)
  }
}
