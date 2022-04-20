import Client from '@client/Client'

export default abstract class Event {
  public method: 'on' | 'once' = 'on'

  public constructor(protected client: Client) {}

  public abstract run(...args: any[]): Promise<void>
}
