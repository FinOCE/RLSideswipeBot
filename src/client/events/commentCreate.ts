import Client from '@client/Client'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)
  }

  public async run(
    data: CommentProps,
    res: ActionResponse<CommentData>
  ): Promise<void> {
    console.log(
      `[Post] Created a comment ${res.json.data.things[0].data.name} on ${data.thing_id}`
    )
  }
}
