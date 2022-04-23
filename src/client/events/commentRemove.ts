import Client from '@client/Client'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)
  }

  public async run(id: Fullname, spam: 'true' | 'false'): Promise<void> {
    console.log(
      `[Comment] Removed the comment ${id} ${spam === 'true' ? '(spam)' : ''}`
    )
  }
}
