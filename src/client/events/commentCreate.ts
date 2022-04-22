import Client from '@client/Client'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)
  }

  public async run(data: CommentProps, res: RedditComment): Promise<void> {
    console.log(`[Comment] Created a comment ${res.name} on ${data.thing_id}`)
  }
}
