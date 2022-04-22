import Client from '@client/Client'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)

    this.method = 'once'
  }

  public async run(): Promise<void> {
    console.log(`${this.client.user!.name} is now online`)
  }
}
