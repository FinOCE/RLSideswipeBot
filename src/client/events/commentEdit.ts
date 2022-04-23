import Client from '@client/Client'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)
  }

  public async run(data: CommentProps): Promise<void> {
    console.log(`[Comment] Edited a comment ${data.thing_id}`)
  }
}
