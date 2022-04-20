import Client from '@client/Client'
import Event from '@structures/Event'

export default class extends Event {
  public constructor(client: Client) {
    super(client)

    this.method = 'once'
  }

  public async run(): Promise<void> {
    this.client.readyAt = new Date()
    console.log('Client is now online')
  }
}
