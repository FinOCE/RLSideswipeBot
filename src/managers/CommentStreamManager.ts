import Client from '@client/Client'
import Comment from '@structures/Comment'

export default class CommentStream {
  public static readonly MIN_DELAY = 4
  public static readonly MAX_DELAY = 16

  private interval: NodeJS.Timer | null = null
  private prev: string | null = null

  public constructor(private client: Client, public subreddit: string) {}

  /**
   * Start the comment stream
   */
  public start(callback: (comment: Comment) => void | Promise<void>) {
    let seconds = CommentStream.MIN_DELAY
    let counter = 0

    this.interval = setInterval(async () => {
      counter++

      if (counter >= seconds) {
        counter = 0

        let i = 0
        for await (const comment of this) {
          callback(comment)
          i++
        }

        seconds =
          i !== 0
            ? CommentStream.MIN_DELAY
            : seconds >= CommentStream.MAX_DELAY
            ? CommentStream.MAX_DELAY
            : seconds * 2
      }
    }, 1000)
  }

  /**
   * Stop the comment stream
   */
  public stop() {
    if (this.interval === null)
      throw new Error("A stream that hasn't started cannot be stopped")

    clearInterval(this.interval)
  }

  /**
   * Generator iterator for the comment stream
   */
  async *[Symbol.asyncIterator]() {
    const { children: comments } = await this.client.comments
      .fetch({
        sr: this.subreddit
      })
      .then(res => res[0])

    if (comments.length === 0) return

    const maxIndex = comments.findIndex(c => c.id === this.prev)
    this.prev = comments[0].id

    const newComments = comments
      .slice(0, maxIndex === -1 ? undefined : maxIndex)
      .reverse()

    for (const comment of newComments) {
      yield comment
    }
  }
}
