import Client from '@client/Client'
import Comment from '@structures/Comment'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)
  }

  public async run(data: CommentProps, res: Comment): Promise<void> {
    console.log(`[Comment] Created a comment ${res.id} on ${data.thing_id}`)
  }
}
