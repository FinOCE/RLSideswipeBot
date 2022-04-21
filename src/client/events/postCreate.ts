import Client from '@client/Client'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)
  }

  public async run(
    data: PostProps,
    res: ActionResponse<PostData>
  ): Promise<void> {
    console.log(`[Post] Created a post ${res.json.data.name} on ${data.sr}`)
  }
}
