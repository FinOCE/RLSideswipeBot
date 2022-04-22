import Client from '@client/Client'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)
  }

  public async run(data: PostProps, res: PostData): Promise<void> {
    console.log(`[Post] Created a post ${res.name} on ${data.sr}`)
  }
}
