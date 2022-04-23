import Client from '@client/Client'
import Comment from '@structures/Comment'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)
  }

  public async run(res: Comment): Promise<void> {
    console.log(`[Comment] Approved a comment ${res.id}`)
  }
}
