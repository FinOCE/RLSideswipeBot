import Client from '@client/Client'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)
  }

  public async run(data: RemoveProps, res: {}): Promise<void> {
    console.log(
      `[Remove] Removed the post ${data.id} ${data.spam ? '(spam)' : ''}`
    )
  }
}